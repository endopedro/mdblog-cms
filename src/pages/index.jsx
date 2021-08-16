import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import Layout from '../components/admin/Layout'

const Dashboard = () => {
  const router = useRouter()

  useEffect(() => router.replace('/posts'), [])

  return <Layout page="Dashboard"></Layout>
}

export default Dashboard
