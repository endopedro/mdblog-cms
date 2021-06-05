import React from 'react'
import Head from 'next/head'
import { useMantineTheme } from '@mantine/core'
import { Toaster } from 'react-hot-toast'
import Guard from '../../domain/Guard'

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
      <Guard>
        <main>{children}</main>
      </Guard>
      <Toaster />
    </>
  )
}

export default AdminLayout
