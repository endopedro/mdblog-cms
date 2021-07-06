import React, { useEffect } from 'react'
import Router from 'next/router'
import Head from 'next/head'
import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import NProgress from 'nprogress'

import 'tailwindcss/tailwind.css'
import '@openfonts/baloo-tammudu-2_telugu/index.css'
import '../assets/styles/main.scss'

export default function App(props) {
  const { Component, pageProps } = props

  useEffect(() => {
    const jssStyles = document.getElementById('mantine-ssr-styles')
    if (jssStyles) jssStyles.parentElement.removeChild(jssStyles)
  }, [])

  NProgress.configure({ showSpinner: false })
  Router.events.on('routeChangeStart', (url) => NProgress.start())
  Router.events.on('routeChangeComplete', () => NProgress.done())
  Router.events.on('routeChangeError', () => NProgress.done())

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
        <NotificationsProvider position="top-right">
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
    </>
  )
}
