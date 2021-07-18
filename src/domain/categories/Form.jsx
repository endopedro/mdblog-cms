import React from 'react'
import { Button } from '@mantine/core'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { InputText } from '../../components/admin/Form'

const schema = yup.object().shape({
  label: yup
    .string()
    .required('Enter a content')
    .min(3, 'Type at least 3 chars'),
})

const PostForm = ({ onSubmit, loading, content }) => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: { label: content?.label, _id: content?._id },
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <input type="hidden" {...methods.register('_id')} />
        <InputText
          className="mb-3"
          name="label"
          label='Category'
          required
          disabled={loading}
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
    </FormProvider>
  )
}

export default PostForm
