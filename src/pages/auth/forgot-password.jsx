import React, { useState } from 'react'
import Head from 'next/head'
import { Title, Paper, Center, LoadingOverlay, Button } from '@mantine/core'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { RiMailLine, RiMailCheckFill } from 'react-icons/ri'
import { ThemeIcon } from '@mantine/core'

import Layout from '../../components/auth/Layout'
import userApi from '../../services/userApi'
import { InputText } from '../components/admin/Form'

const schema = yup.object().shape({
  email: yup.string().required('Type an e-mail.').email('Type a valid e-mail.'),
})

const ForgotPassword = () => {
  const methods = useForm({ resolver: yupResolver(schema) })
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const onSubmit = (data) => {
    setLoading(true)
    userApi()
      .forgotPassword(data)
      .then(() => setEmailSent(true))
      .finally(() => setLoading(false))
  }

  return (
    <Layout>
      <Head>
        <title>Forgot Password</title>
      </Head>
      <Center className="absolute w-full h-full flex-col">
        <Title order={1} className="mb-5">
          {emailSent ? 'Email Sent' : 'Forgot Password'}
        </Title>
        <Paper padding="lg" shadow="md" className="w-5/6 sm:w-96 mb-16">
          <LoadingOverlay visible={loading} />
          {emailSent ? (
            <div className="text-center">
              <ThemeIcon className="mb-5" radius="xl" size="xl">
                <RiMailCheckFill />
              </ThemeIcon>
              <Title order={5} className="mb-5">
                Check your email to reset your password.
              </Title>
            </div>
          ) : (
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="mb-5">
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
                </div>
                <Button
                  className="float-right"
                  variant="light"
                  color="indigo"
                  radius="lg"
                  disabled={loading}
                  type="submit"
                >
                  Enter
                </Button>
              </form>
            </FormProvider>
          )}
        </Paper>
      </Center>
    </Layout>
  )
}

export default ForgotPassword
