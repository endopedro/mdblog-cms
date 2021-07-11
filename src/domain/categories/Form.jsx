import React from 'react'
import { TextInput, Button } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  label: yup
    .string()
    .required('Enter a content')
    .min(3, 'Type at least 3 chars'),
})

const PostForm = ({ onSubmit, loading, content }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { label: content?.label, _id: content?._id },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register('_id')} />
      <TextInput
        label="Category"
        radius="md"
        required
        className="mb-3"
        error={errors.content?.message}
        disabled={loading}
        {...register('label')}
        defaultValue={getValues('label')}
        onChange={(e) => setValue('label', e.target.value)}
      />
      <Button
        type="submit"
        variant="light"
        radius="md"
        fullWidth
        disabled={loading}
      >
        {content ? 'Update' : 'Create'} Category
      </Button>
    </form>
  )
}

export default PostForm
