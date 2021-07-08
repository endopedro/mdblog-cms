import React from 'react'
import { TextInput, PasswordInput, Textarea, Button } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Type your name.')
    .min(3, 'Minimum of 3 characters.'),
  email: yup.string().required('Type an e-mail.').email('Type a valid e-mail.'),
})

const ProfileForm = ({ onSubmit, loading, profile }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), defaultValues: profile })

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
        defaultValue={profile?.name}
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
        defaultValue={profile?.email}
        error={errors.email?.message}
        onChange={(e) => setValue('email', e.target.value)}
      />
      <Textarea
        {...register('bio')}
        label="Bio"
        radius="md"
        className="mb-3"
        disabled={loading}
        defaultValue={profile?.bio}
        error={errors.bio?.message}
        onChange={(e) => setValue('bio', e.target.value)}
        minRows={4}
        maxRows={8}
      />
      <PasswordInput
        {...register('password')}
        label="New Password"
        radius="md"
        type="submit"
        maxLength="50"
        className="mb-3"
        disabled={loading}
        error={profile ? null : errors.password?.message}
        onChange={(e) => setValue('password', e.target.value)}
      />
      <PasswordInput
        {...register('current_password')}
        label="Current Password"
        radius="md"
        type="submit"
        maxLength="50"
        className="mb-5"
        disabled={loading}
        error={profile ? null : errors.password?.message}
        onChange={(e) => setValue('current_password', e.target.value)}
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
  )
}

export default ProfileForm
