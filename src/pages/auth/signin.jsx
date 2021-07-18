import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {
  Title,
  Paper,
  Center,
  LoadingOverlay,
  Button,
  Text,
} from '@mantine/core'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { signIn } from 'next-auth/client'
import { useRouter } from 'next/router'
import {
  RiMailLine,
  RiLockPasswordLine,
  RiCloseLine,
  RiCheckLine,
} from 'react-icons/ri'
import { useNotifications } from '@mantine/notifications'

import Layout from '../../components/auth/Layout'
import { InputText, InputPassword } from '../../components/admin/Form'

const schema = yup.object().shape({
  email: yup.string().required('Type an e-mail.').email('Type a valid e-mail.'),
  password: yup
    .string()
    .min(6, 'Minimum of 6 characters.')
    .required('Type a password.'),
})

const Login = () => {
  const router = useRouter()
  const notifications = useNotifications()
  const methods = useForm({ resolver: yupResolver(schema) })
  const [loading, setLoading] = useState(false)

  const notify = (success = true, message) => {
    notifications.showNotification({
      title: success ? 'Logged in' : 'Login Fail',
      message: message,
      color: success ? 'blue' : 'red',
      icon: success ? <RiCheckLine /> : <RiCloseLine />,
    })
  }

  const onSubmit = async (data) => {
    setLoading(true)
    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    })
    setLoading(false)
    notify(!result.erro)
    if (!result.error) router.replace('/admin')
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
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="mb-5">
                <InputText
                  name='email'
                  placeholder="e-mail"
                  label="E-mail"
                  required
                  className="mb-3"
                  disabled={loading}
                  icon={<RiMailLine />}
                />
                <InputPassword
                  className='mb-7'
                  name='password'
                  placeholder="password"
                  required
                  type="submit"
                  disabled={loading}
                  icon={<RiLockPasswordLine />}
                />
              </div>
              <div className="flex justify-between items-center">
                <Link href="/auth/forgot-password">
                  <a>
                    <Text size="xs">Forgot password?</Text>
                  </a>
                </Link>
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
          </FormProvider>
        </Paper>
      </Center>
    </Layout>
  )
}

export default Login
