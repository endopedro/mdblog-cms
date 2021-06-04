import React from 'react'
import Head from 'next/head'
import { useMantineTheme } from '@mantine/core'

const AdminLayout = ({ children }) => {
  const theme = useMantineTheme()

  return (
    <>
      <style jsx global>{`
        body {
          background-color: ${theme.colors['dark'][8]};
          color: ${theme.colors['dark'][0]};
          margin: 0;
        }
      `}</style>
      <Head>
        <title>Admin</title>
      </Head>
      <main>{children}</main>
    </>
  )
}

export default AdminLayout
