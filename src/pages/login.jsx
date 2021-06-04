import React from 'react'
import Head from 'next/head'
import { Title, Paper, Center, TextInput, PasswordInput } from '@mantine/core'

import Layout from '../components/admin/Layout'

const login = () => {
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
          <TextInput
            placeholder="e-mail"
            label="E-mail "
            radius="xl"
            required
            className="mb-7"
            name="email"
          />
          <PasswordInput
            placeholder="password"
            label="Password"
            radius="xl"
            required
          />
        </Paper>
      </Center>
    </Layout>
  )
}

export default login
