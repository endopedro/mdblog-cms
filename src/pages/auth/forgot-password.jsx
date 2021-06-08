import React, { useState } from 'react'
import Head from 'next/head'
import {
  Title,
  Paper,
  Center,
  TextInput,
  LoadingOverlay,
  Button,
} from '@mantine/core'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { RiMailLine, RiMailCheckFill } from 'react-icons/ri'
import { ThemeIcon } from '@mantine/core'

import Layout from '../../components/admin/Layout'
import userApi from '../../services/userApi'

const schema = yup.object().shape({
  email: yup.string().required('Type an e-mail.').email('Type a valid e-mail.'),
})

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

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
                  description="You'll receive an e-mail with instructions."
                  icon={<RiMailLine />}
                  error={errors.email?.message}
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
          )}
        </Paper>
      </Center>
    </Layout>
  )
}

export default ForgotPassword
