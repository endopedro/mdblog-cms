import React, { useState, useEffect } from 'react'
import { RiCloseLine, RiCheckLine } from 'react-icons/ri'
import { useNotifications } from '@mantine/notifications'
import { Title, Divider, LoadingOverlay } from '@mantine/core'
import { useRouter } from 'next/router'

import Layout from '../../../components/admin/Layout'
import Form from '../../../domain/pages/Form'

import { data, editPage, load } from '../../../states/pages'

const updatePage = () => {
  const router = useRouter()
  const { slug } = router.query
  const pages = data.use()
  const loading = load.use()
  const notifications = useNotifications()

  const [page, setPage] = useState(null)

  const notify = (success = true, message) => {
    notifications.showNotification({
      title: success ? 'Success' : 'Fail',
      message: success ? 'Page Created' : 'Something went wrong',
      color: success ? 'blue' : 'red',
      icon: success ? <RiCheckLine /> : <RiCloseLine />,
    })
  }

  useEffect(async () => {
    if (slug) {
      const pageToEdit = pages?.find((page) => page.slug == slug)
      if (pageToEdit) setPage(pageToEdit)
      else notify(false, 'Page not found.')
    }
  }, [pages])

  const onSubmit = async (data) => {
    const isPageUpdated = await editPage(data)
    notify(isPageUpdated)
    if (isPageUpdated) router.push('/admin/pages')
  }

  return (
    <Layout page="Pages">
      <LoadingOverlay visible={loading} />
      <Title order={3}>Edit Page</Title>
      <Divider className="mb-5 mt-2" />
      {page && (
        <Form slug={slug} onSubmit={onSubmit} loading={loading} page={page} />
      )}
    </Layout>
  )
}

export default updatePage
