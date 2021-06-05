import React, { useEffect, useState } from 'react'
import { signIn, getSession, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { LoadingOverlay } from '@mantine/core'

const Guard = ({ withSession, children }) => {
  const [session, setSession] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    getSession({ triggerEvent: false })
      .then((session) => setSession(session))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) return <LoadingOverlay visible />

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
