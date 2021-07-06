import React, { useEffect, useState } from 'react'
import { getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { LoadingOverlay } from '@mantine/core'
import { data, setSession } from '../states/session'

const Guard = ({ withSession, children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const session = data.use()
  const router = useRouter()

  useEffect(() => {
    getSession({ triggerEvent: false })
      .then((session) => setSession(session))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading && !session) return <LoadingOverlay visible />

  if (!session && router.pathname.includes('/admin')) {
    router.replace('/auth/signin')
    return <LoadingOverlay visible />
  }

  if (session && router.pathname.includes('/auth')) {
    router.replace('/admin')
    return <LoadingOverlay visible />
  }

  return <>{children}</>
}

export default Guard
