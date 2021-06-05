import React, { useState } from 'react'
import Head from 'next/head'
import {
  Title,
  Paper,
  Center,
  TextInput,
  PasswordInput,
  LoadingOverlay,
  Button,
} from '@mantine/core'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { signIn } from 'next-auth/client'
import { useRouter } from 'next/router'
import { RiMailLine, RiLockPasswordLine } from 'react-icons/ri'
import toast from 'react-hot-toast'

import Layout from '../../components/admin/Layout'
import { darkToast } from '../../data/toastStyles'

const schema = yup.object().shape({
  email: yup.string().required('Type an e-mail.').email('Type a valid e-mail.'),
  password: yup
    .string()
    .min(6, 'Minimum of 6 characters.')
    .required('Type a password.'),
})

const Login = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    setLoading(true)
    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    })
    setLoading(false)
    if (!result.error) {
      toast.success('Logged in!', darkToast)
      router.replace('/admin')
    } else toast.error(result.error, darkToast)
  }

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
          <LoadingOverlay visible={loading} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <TextInput
                {...register('email')}
                placeholder="e-mail"
                label="E-mail "
                radius="xl"
                required
                className="mb-7"
                disabled={loading}
                icon={<RiMailLine />}
                error={errors.email?.message}
              />
              <PasswordInput
                {...register('password')}
                placeholder="password"
                label="Password"
                radius="xl"
                required
                type="submit"
                disabled={loading}
                icon={<RiLockPasswordLine />}
                error={errors.password?.message}
              />
            </div>
            <div className="flex">
              <Button
                variant="light"
                color="indigo"
                radius="lg"
                disabled={loading}
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

export default Login
