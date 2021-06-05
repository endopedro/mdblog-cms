import React from 'react'
import Head from 'next/head'
import {
  Title,
  Paper,
  Center,
  TextInput,
  PasswordInput,
  Button,
} from '@mantine/core'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import Layout from '../../components/admin/Layout'

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Type your name.')
    .min(3, 'Minimum of 3 characters.'),
  email: yup.string().required('Type an e-mail.').email('Type a valid e-mail.'),
  password: yup
    .string()
    .min(6, 'Minimum of 6 characters.')
    .required('Type a password.'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must be identic.')
    .required('Confir your password.'),
})

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => console.log(data)

  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>
      <Center className="absolute w-full h-full flex-col">
        <Title order={1} className="mb-5">
          Register
        </Title>
        <Paper padding="lg" shadow="md" className="w-5/6 sm:w-96 mb-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <TextInput
                {...register('name')}
                placeholder="name"
                label="Name"
                radius="xl"
                required
                maxLength="50"
                className="mb-7"
                error={errors.name?.message}
              />
              <TextInput
                {...register('email')}
                placeholder="e-mail"
                label="E-mail"
                radius="xl"
                required
                maxLength="50"
                className="mb-7"
                error={errors.email?.message}
              />
              <PasswordInput
                {...register('password')}
                placeholder="password"
                label="Password"
                radius="xl"
                required
                type="submit"
                maxLength="50"
                className="mb-7"
                error={errors.password?.message}
              />
              <PasswordInput
                {...register('confirm_password')}
                placeholder="confirm password"
                label="Confirm Password"
                radius="xl"
                required
                maxLength="50"
                type="submit"
                error={errors.confirm_password?.message}
              />
            </div>
            <div className="flex">
              <Button
                variant="light"
                color="indigo"
                radius="lg"
                type="submit"
                className="ml-auto"
              >
                Enter
              </Button>
            </div>
          </form>
        </Paper>
      </Center>
    </Layout>
  )
}

export default SignIn
