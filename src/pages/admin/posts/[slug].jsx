import React, { useState, useEffect } from 'react'
import { RiCloseLine, RiCheckLine } from 'react-icons/ri'
import { useNotifications } from '@mantine/notifications'
import { Title, Divider, LoadingOverlay } from '@mantine/core'
import { useRouter } from 'next/router'

import Layout from '../../../components/admin/Layout'
import Form from '../../../domain/posts/Form'

import { data, editPost, load } from '../../../states/posts'

const updatePost = () => {
  const router = useRouter()
  const { slug } = router.query
  const posts = data.use()
  const loading = load.use()
  const notifications = useNotifications()

  const [post, setPost] = useState(null)

  const notify = (success = true, message) => {
    notifications.showNotification({
      title: success ? 'Success' : 'Fail',
      message: success ? 'Post Created' : 'Something went wrong',
      color: success ? 'blue' : 'red',
      icon: success ? <RiCheckLine /> : <RiCloseLine />,
    })
  }

  useEffect(async () => {
    if (slug) {
      const postToEdit = posts?.find((post) => post.slug == slug)
      if (postToEdit) setPost(postToEdit)
      else notify(false, 'Post not found.')
    }
  }, [posts])

  const onSubmit = async (data) => {
    const isPostUpdated = await editPost(data)
    notify(isPostUpdated)
    if (isPostUpdated) router.push('/admin/posts')
  }

  return (
    <Layout page="Posts">
      <LoadingOverlay visible={loading} />
      <Title order={3}>Edit Post</Title>
      <Divider className="mb-5 mt-2" />
      {post && (
        <Form slug={slug} onSubmit={onSubmit} loading={loading} post={post} />
      )}
    </Layout>
  )
}

export default updatePost
