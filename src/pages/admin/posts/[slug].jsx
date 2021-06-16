import React, { useState, useEffect } from 'react'
import { RiCloseLine, RiCheckLine } from 'react-icons/ri'
import { useNotifications } from '@mantine/notifications'
import { Title, Divider, LoadingOverlay } from '@mantine/core'
import { useRouter } from 'next/router'

import postApi from '../../../services/postApi'
import Layout from '../../../components/admin/Layout'
import Form from '../../../domain/posts/Form'

const posts = () => {
  const notifications = useNotifications()
  const router = useRouter()
  const { slug } = router.query
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState(null)

  useEffect(() => {
    if(slug) fetchPost(slug)
  }, [slug])

  const fetchPost = async (slug) => {
    setLoading(true)
    try {
      const data = await postApi().getPost(slug).then(({data}) => data)
      setPost(data.post)
      setLoading(false)
    } catch (error) {
      notifications.showNotification({
        title: 'Fail',
        color: 'red',
        message: error.response.data.message,
        icon: <RiCloseLine />,
      })
      setLoading(false)
    }
  }

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const response = await postApi().updatePost(data)
      setLoading(false)
      notifications.showNotification({
        title: 'Success',
        message: response.data.message,
        icon: <RiCheckLine />,
      })
    } catch (error) {
      notifications.showNotification({
        title: 'Fail',
        color: 'red',
        message: error.response.data.message,
        icon: <RiCloseLine />,
      })
      router.replace('/admin')
      setLoading(false)
    }
  }

  return (
    <Layout>
      <LoadingOverlay visible={loading} />
      <Title order={3}>Edit Post</Title>
      <Divider className="mb-5 mt-2"/>
      {post && (
        <Form slug={slug} onSubmit={onSubmit} loading={loading} post={post} />
      )}
    </Layout>
  )
}

export default posts
