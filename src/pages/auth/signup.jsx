import React, { useState } from 'react'
import Head from 'next/head'
import { Title, Paper, Center, Button, LoadingOverlay } from '@mantine/core'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import userApi from '../../services/userApi'
import {
  RiMailLine,
  RiLockPasswordLine,
  RiLockPasswordFill,
  RiUserLine,
  RiCloseLine,
  RiCheckLine,
} from 'react-icons/ri'
import { useNotifications } from '@mantine/notifications'
import { useRouter } from 'next/router'

import Layout from '../../components/auth/Layout'
import { InputText, InputPassword } from '../../components/admin/Form'

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
    .oneOf([yup.ref('password'), null], 'Passwords must be identical.')
    .required('Confirm your password.'),
})

const SignUp = () => {
  const router = useRouter()
  const notifications = useNotifications()
  const methods = useForm({ resolver: yupResolver(schema) })
  const [loading, setLoading] = useState(false)

  const notify = (success = true, message) => {
    notifications.showNotification({
      title: success ? 'Success' : 'Fail',
      message: message,
      color: success ? 'blue' : 'red',
      icon: success ? <RiCheckLine /> : <RiCloseLine />,
    })
  }

  const onSubmit = async (data) => {
    setLoading(true)
    await userApi()
      .createUser(data)
      .then(response => {
        notify(true, response.data.message)
        router.replace('/auth/signin')
      })
      .catch(error => notify(false, error.response.data.message))
      .finally(() => setLoading(false))
  }

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
          <LoadingOverlay visible={loading} />
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="mb-5">
                <InputText
                  name="name"
                  placeholder="name"
                  required
                  maxLength="50"
                  className="mb-3"
                  icon={<RiUserLine />}
                  disabled={loading}
                />
                <InputText
                  name="email"
                  placeholder="e-mail"
                  label="E-mail"
                  required
                  maxLength="50"
                  className="mb-3"
                  disabled={loading}
                  icon={<RiMailLine />}
                />
                <InputPassword
                  name="password"
                  placeholder="password"
                  required
                  maxLength="50"
                  className="mb-3"
                  disabled={loading}
                  icon={<RiLockPasswordLine />}
                />
                <InputPassword
                  name="confirm_password"
                  placeholder="confirm password"
                  label="Confirm Password"
                  required
                  maxLength="50"
                  disabled={loading}
                  icon={<RiLockPasswordFill />}
                  type="submit"
                />
              </div>
                <Button
                  variant="light"
                  color="indigo"
                  radius="lg"
                  type="submit"
                  disabled={loading}
                  className="float-right"
                >
                  Enter
                </Button>
            </form>
          </FormProvider>
        </Paper>
      </Center>
    </Layout>
  )
}

export default SignUp
