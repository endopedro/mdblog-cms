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

import Layout from '../components/admin/Layout'

const schema = yup.object().shape({
  email: yup.string().required('Type an e-mail.').email('Type a valid e-mail.'),
  password: yup
    .string()
    .min(6, 'Minimum of 6 characters.')
    .required('Type a password.'),
})

const login = () => {
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
        <title>Login</title>
      </Head>
      <Center className="absolute w-full h-full flex-col">
        <Title order={1} className="mb-5">
          Login
        </Title>
        <Paper padding="lg" shadow="md" className="w-5/6 sm:w-96 mb-16">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <TextInput
                {...register('email')}
                placeholder="e-mail"
                label="E-mail "
                radius="xl"
                required
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
                error={errors.password?.message}
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

export default login
