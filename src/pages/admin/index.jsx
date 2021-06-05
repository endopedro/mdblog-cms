import React from 'react'
import Layout from '../../components/admin/Layout'
import { signOut } from 'next-auth/client'

import { Button } from '@mantine/core'

const Admin = () => {
  return (
    <Layout>
      <Button
        variant="light"
        color="indigo"
        radius="lg"
        type="submit"
        className="ml-auto"
        onClick={signOut}
      >
        Logout
      </Button>
    </Layout>
  )
}

export default Admin
