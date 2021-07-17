import React from 'react'
import { Button } from '@mantine/core'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { InputText, InputPassword } from '../../components/admin/Form'

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Type your name.')
    .min(3, 'Minimum of 3 characters.'),
  email: yup.string().required('Type an e-mail.').email('Type a valid e-mail.'),
  // password: yup
  //   .string()
  //   .min(6, 'Minimum of 6 characters.')
  //   .required('Type a password.'),
})

const EditorForm = ({ onSubmit, loading, content }) => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: content,
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <input type="hidden" {...methods.register('id')} />
        <InputText
          className="mb-3"
          name="name"
          required
          error={methods.errors?.title?.message}
          disabled={loading}
          maxLength="50"
        />
        <InputText
          className="mb-3"
          name="email"
          label="E-mail"
          required
          error={methods.errors?.title?.message}
          disabled={loading}
          maxLength="50"
        />
        <InputPassword
          className="mb-3"
          name="password"
          required
          error={methods.errors?.title?.message}
          disabled={loading}
          maxLength="50"
        />
        <Button
          type="submit"
          variant="light"
          radius="md"
          fullWidth
          disabled={loading}
        >
          {content ? 'Update' : 'Create'} Editor
        </Button>
      </form>
    </FormProvider>
  )
}

export default EditorForm
