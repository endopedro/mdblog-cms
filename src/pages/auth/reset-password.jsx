import React, { useState, useEffect } from 'react'
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
import { useRouter } from 'next/router'
import {
  RiLockPasswordLine,
  RiLockPasswordFill,
  RiThumbUpFill,
  RiCloseCircleFill,
} from 'react-icons/ri'
import { ThemeIcon } from '@mantine/core'

import Layout from '../../components/auth/Layout'
import userApi from '../../services/userApi'
import { InputPassword } from '../../components/admin/Form'

const schema = yup.object().shape({
  password: yup
    .string()
    .min(6, 'Minimum of 6 characters.')
    .required('Type a password.'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must be identical.')
    .required('Confirm your password.'),
})

const ResetPassword = () => {
  const router = useRouter()
  const methods = useForm({ resolver: yupResolver(schema) })

  const [loading, setLoading] = useState(true)
  const [validToken, setValidToken] = useState(false)
  const [changedPassword, setChangedPassword] = useState(false)

  const onSubmit = (data) => {
    setLoading(true)
    userApi()
      .resetPassword({ ...data, token: router.query.token })
      .then(() => setChangedPassword(true))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (router.query.token) {
      userApi()
        .verifyToken(router.query.token)
        .then(() => setValidToken(true))
        .catch(() => setValidToken(false))
        .finally(() => setLoading(false))
    } else setLoading(false)
  }, [router.query])

  return (
    <Layout>
      <Head>
        <title>Reset Password</title>
      </Head>
      <Center className="absolute w-full h-full flex-col">
        {validToken && (
          <Title order={1} className="mb-5">
            Reset Password
          </Title>
        )}
        <Paper padding="lg" shadow="md" className="w-5/6 sm:w-96 mb-16">
          <LoadingOverlay visible={loading} />
          {validToken ? (
            changedPassword ? (
              <div className="text-center">
                <ThemeIcon className="mb-5" radius="xl" size="xl">
                  <RiThumbUpFill />
                </ThemeIcon>
                <Title order={5} className="mb-5">
                  Password changed.
                </Title>
              </div>
            ) : (
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  <div className="mb-5">
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
            )
          ) : (
            <div className="text-center">
              <ThemeIcon className="mb-5" radius="xl" size="xl">
                <RiCloseCircleFill />
              </ThemeIcon>
              <Title order={5} className="mb-5">
                Invalid or Expired Token.
              </Title>
            </div>
          )}
          <Link href="/auth/signin">
            <a className="text-center">
              <Text color="blue" size="xs">
                Go back to login
              </Text>
            </a>
          </Link>
        </Paper>
      </Center>
    </Layout>
  )
}

export default ResetPassword
