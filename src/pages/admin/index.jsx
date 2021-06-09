import React from 'react'
import Layout from '../../components/admin/Layout'
import { signOut } from 'next-auth/client'

import { Button } from '@mantine/core'
import Sidebar from '../../components/admin/Sidebar'

const Admin = () => {
  return (
    <Layout>
      <Sidebar />
    </Layout>
  )
}

export default Admin
