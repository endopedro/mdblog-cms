import React from 'react'
import { Button } from '@mantine/core'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { InputText, InputTextarea, InputPassword } from '../../components/admin/Form'

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Type your name.')
    .min(3, 'Minimum of 3 characters.'),
  email: yup.string().required('Type an e-mail.').email('Type a valid e-mail.'),
})

const ProfileForm = ({ onSubmit, loading, content }) => {
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
          disabled={loading}
          maxLength="50"
        />
        <InputText
          className="mb-3"
          name="email"
          required
          disabled={loading}
          maxLength="50"
          label="E-mail"
        />
        <InputTextarea
          className="mb-3"
          name='bio'
          disabled={loading}
          minRows={4}
          maxRows={8}
        />
        <InputPassword
          className="mb-3"
          name="password"
          label="New Password"
          maxLength="50"
          disabled={loading}
          error={content ? null : methods.formState.errors.password?.message}
        />
        <InputPassword
          className="mb-3"
          name="current_password"
          label="Current Password"
          maxLength="50"
          disabled={loading}
          error={content ? null : methods.formState.errors.password?.message}
        />
        <Button
          type="submit"
          variant="light"
          radius="md"
          fullWidth
          disabled={loading}
        >
          Update Profile
        </Button>
      </form>
    </FormProvider>
  )
}

export default ProfileForm
