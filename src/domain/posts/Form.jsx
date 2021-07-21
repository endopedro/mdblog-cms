import React, { useState, useEffect } from 'react'
import { Button, Loader } from '@mantine/core'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  InputText,
  InputSelect,
  InputTags,
  InputMarkdown,
  InputCover,
} from '../../components/admin/Form'

import categoryApi from '../../services/categoryApi'

const schema = yup.object().shape({
  title: yup.string().required('Enter a title').min(3, 'Type at least 3 chars'),
  slug: yup.string().required('Enter a slug').min(3, 'Type at least 3 chars'),
  category: yup.string().required('Pick a category'),
})

const PostForm = ({ onSubmit, loading, content }) => {
  const [categories, setCategories] = useState(null)

  useEffect(async () => {
    await categoryApi()
      .getCategories()
      .then(({ data }) => setCategories(data.result))
      .catch(() => null)
  }, [])

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: content,
  })

  if (!categories) return <Loader className="mx-auto" />

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <InputText className="mb-3" name="title" required disabled={loading} />
        <InputText
          className="mb-3"
          name="slug"
          required
          slugField
          disabled={loading}
        />
        <div className="grid grid-cols-2 gap-4 mb-1">
          <div>
            <InputSelect
              name="category"
              data={categories?.map((cat) => ({
                value: cat._id,
                label: cat.label,
              }))}
              required
              disabled={loading}
            />
          </div>
          <div>
            <InputTags name="tags" disabled={loading} value={content?.tags} />
          </div>
        </div>
        <InputCover className="mb-7" name="cover_image" />
        <InputMarkdown name="content" className="mb-3" disabled={loading} />
        <Button
          type="submit"
          variant="light"
          radius="md"
          fullWidth
          disabled={loading}
        >
          {content ? 'Update' : 'Create'} Post
        </Button>
      </form>
    </FormProvider>
  )
}

export default PostForm
