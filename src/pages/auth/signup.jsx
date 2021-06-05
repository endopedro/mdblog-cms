import React, { useState } from 'react'
import Head from 'next/head'
import {
  Title,
  Paper,
  Center,
  TextInput,
  PasswordInput,
  Button,
  LoadingOverlay,
} from '@mantine/core'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import userApi from '../../services/userApi'
import {
  RiMailLine,
  RiLockPasswordLine,
  RiLockPasswordFill,
  RiUserLine,
} from 'react-icons/ri'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

import Layout from '../../components/admin/Layout'
import { darkToast } from '../../data/toastStyles'

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const response = await userApi().createUser(data)
      setLoading(false)
      toast.success(response.data.message, darkToast)
      router.replace('/auth/signin')
    } catch (error) {
      toast.error(error.response.data.message, darkToast)
      setLoading(false)
    }
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
        <Paper padding="lg" shadow="md" className="w-5/6 sm:w-96 mb-8 relative">
          <LoadingOverlay visible={loading} />
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
                icon={<RiUserLine />}
                disabled={loading}
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
                maxLength="50"
                className="mb-7"
                disabled={loading}
                icon={<RiLockPasswordLine />}
                error={errors.password?.message}
              />
              <PasswordInput
                {...register('confirm_password')}
                placeholder="confirm password"
                label="Confirm Password"
                radius="xl"
                required
                maxLength="50"
                disabled={loading}
                icon={<RiLockPasswordFill />}
                error={errors.confirm_password?.message}
              />
            </div>
            <div className="flex">
              <Button
                variant="light"
                color="indigo"
                radius="lg"
                type="submit"
                disabled={loading}
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

export default SignUp
