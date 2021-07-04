import React from 'react'
import { TextInput, Button } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import slugify from 'slugify'
import MdInput from '../../components/MdInput'

const schema = yup.object().shape({
  title: yup.string().required('Enter a title').min(3, 'Type at least 3 chars'),
  slug: yup.string().required('Enter a slug').min(3, 'Type at least 3 chars'),
})

const PageForm = ({ onSubmit, loading, page }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), defaultValues: page })

  register('content')
  register('slug')
  const watchSlug = watch('slug', page ? page.slug : '')
  const watchContent = watch('content')

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        label="Title"
        radius="md"
        required
        className="mb-3"
        error={errors.title?.message}
        disabled={loading}
        {...register('title')}
        defaultValue={getValues('title')}
        onChange={(e) => setValue('title', e.target.value)}
      />
      <TextInput
        label="Slug"
        radius="md"
        required
        className="mb-5"
        onChange={(e) =>
          setValue(
            'slug',
            slugify(e.target.value, { lower: true, strict: true })
          )
        }
        description={watchSlug}
        error={errors.slug?.message}
        disabled={loading}
        name="slug"
        defaultValue={getValues('slug')}
      />

      <MdInput
        value={watchContent}
        onChange={(val) => setValue('content', val)}
        className="mb-3"
        disabled={loading}
      />
      <Button
        type="submit"
        variant="light"
        radius="md"
        fullWidth
        disabled={loading}
      >
        {page ? 'Update' : 'Create'} Page
      </Button>
    </form>
  )
}

export default PageForm
