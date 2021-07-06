import React from 'react'
import { TextInput, PasswordInput, Button } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

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

const EditorForm = ({ onSubmit, loading, editor }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), defaultValues: editor })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register('id')} />
      <TextInput
        {...register('name')}
        label="Name"
        radius="md"
        required
        maxLength="50"
        className="mb-3"
        disabled={loading}
        defaultValue={editor?.name}
        error={errors.name?.message}
        onChange={(e) => setValue('name', e.target.value)}
      />
      <TextInput
        {...register('email')}
        label="E-mail"
        radius="md"
        required
        maxLength="50"
        className="mb-3"
        disabled={loading}
        defaultValue={editor?.email}
        error={errors.email?.message}
        onChange={(e) => setValue('email', e.target.value)}
      />
      <PasswordInput
        {...register('password')}
        label="Password"
        radius="md"
        required
        type="submit"
        maxLength="50"
        className="mb-5"
        disabled={loading}
        error={editor ? null : errors.password?.message}
        onChange={(e) => setValue('password', e.target.value)}
      />
      <Button
        type="submit"
        variant="light"
        radius="md"
        fullWidth
        disabled={loading}
      >
        {editor ? 'Update' : 'Create'} Editor
      </Button>
    </form>
  )
}

export default EditorForm
