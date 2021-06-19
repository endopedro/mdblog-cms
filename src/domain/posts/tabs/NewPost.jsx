import React, { useState } from 'react'
import { RiCloseLine, RiCheckLine } from 'react-icons/ri'
import { useNotifications } from '@mantine/notifications'
import { LoadingOverlay } from '@mantine/core'

import postApi from '../../../services/postApi'
import Form from '../Form'
import { setPosts } from '../../../states/posts'

const NewPost = ({ setActiveTab }) => {
  const notifications = useNotifications()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const response = await postApi().createPost(data)
      setLoading(false)
      notifications.showNotification({
        title: 'Success',
        message: response.data.message,
        icon: <RiCheckLine />,
      })
      setPosts((prevState) => [...prevState, response.data.post])
      setActiveTab(0)
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

  return (
    <div className="relative">
      <LoadingOverlay visible={loading} />
      <Form onSubmit={onSubmit} loading={loading} />
    </div>
  )
}

export default NewPost
