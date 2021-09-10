import React from 'react'
import { Button } from '@mantine/core'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  InputText,
  InputMarkdown,
  InputCover,
} from '../../components/admin/Form'

const schema = yup.object().shape({
  title: yup.string().required('Enter a title').min(3, 'Type at least 3 chars'),
  slug: yup.string().required('Enter a slug').min(3, 'Type at least 3 chars'),
})

const PageForm = ({ onSubmit, loading, content }) => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: content,
  })

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
        <InputCover className="mb-7" name="coverId" />
        <InputMarkdown name="content" className="mb-3" disabled={loading} />
        <Button
          type="submit"
          variant="light"
          radius="md"
          fullWidth
          disabled={loading}
        >
          {content ? 'Update' : 'Create'} Page
        </Button>
      </form>
    </FormProvider>
  )
}

export default PageForm
