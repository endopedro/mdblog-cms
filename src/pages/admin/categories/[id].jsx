import React, { useState, useEffect } from 'react'
import { RiCloseLine, RiCheckLine } from 'react-icons/ri'
import { useNotifications } from '@mantine/notifications'
import { Title, Divider, LoadingOverlay } from '@mantine/core'
import { useRouter } from 'next/router'

import Layout from '../../../components/admin/Layout'
import Form from '../../../domain/categories/Form'

import { data, editCategory, load } from '../../../states/categories'

const updateCategory = () => {
  const router = useRouter()
  const { slug } = router.query
  const categories = data.use()
  const loading = load.use()
  const notifications = useNotifications()

  const [category, setCategory] = useState(null)

  const notify = (success = true, message) => {
    notifications.showNotification({
      title: success ? 'Success' : 'Fail',
      message: success ? 'Category Created' : 'Something went wrong',
      color: success ? 'blue' : 'red',
      icon: success ? <RiCheckLine /> : <RiCloseLine />,
    })
  }

  useEffect(async () => {
    if (slug) {
      const categoryToEdit = categories?.find(
        (category) => category.slug == slug
      )
      if (categoryToEdit) setCategory(categoryToEdit)
      else notify(false, 'Category not found.')
    }
  }, [categories])

  const onSubmit = async (data) => {
    const isCategoryUpdated = await editCategory(data)
    notify(isCategoryUpdated)
    if (isCategoryUpdated) router.push('/admin/categories')
  }

  return (
    <Layout page="Categories">
      <LoadingOverlay visible={loading} />
      <Title order={3}>Edit Category</Title>
      <Divider className="mb-5 mt-2" />
      {category && (
        <Form
          slug={slug}
          onSubmit={onSubmit}
          loading={loading}
          category={category}
        />
      )}
    </Layout>
  )
}

export default updateCategory
