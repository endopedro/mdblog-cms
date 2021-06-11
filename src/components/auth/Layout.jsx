import React from 'react'
import Head from 'next/head'
import { useMantineTheme } from '@mantine/core'
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

        *::-webkit-scrollbar {
          width: 12px;
        }

        *::-webkit-scrollbar-track {
          background: ${theme.colors['dark'][4]};
        }

        *::-webkit-scrollbar-thumb {
          background-color: ${theme.colors['dark'][7]};
          border-radius: 20px;
          border: 3px solid ${theme.colors['dark'][4]};
        }

        *::-webkit-resizer {
          border: 9px solid ${theme.colors['dark'][8]};
          border-bottom-color: ${theme.colors['dark'][4]};
          border-right-color: ${theme.colors['dark'][4]};
        }
      `}</style>
      <Head>
        <title>Auth</title>
      </Head>
      <Guard>
        <main>{children}</main>
      </Guard>
    </>
  )
}

export default AdminLayout
