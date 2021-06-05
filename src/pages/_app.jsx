import React, { useEffect } from 'react'
import Head from 'next/head'
import { MantineProvider } from '@mantine/core'

import 'tailwindcss/tailwind.css'
import '@openfonts/baloo-tammudu-2_telugu/index.css'

export default function App(props) {
  const { Component, pageProps } = props

  useEffect(() => {
    const jssStyles = document.getElementById('mantine-ssr-styles')
    if (jssStyles) jssStyles.parentElement.removeChild(jssStyles)
  }, [])

  return (
    <>
      <Head>
        <title>Mantine next example</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MantineProvider
        theme={{
          colorScheme: 'dark',
          fontFamily: 'Baloo Tammudu 2',
          headings: {
            fontFamily: 'Baloo Tammudu 2',
          },
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  )
}
