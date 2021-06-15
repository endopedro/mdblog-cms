import React, { useState } from 'react'
import { RiCloseLine, RiCheckLine } from 'react-icons/ri'
import { useNotifications } from '@mantine/notifications'
import { LoadingOverlay } from '@mantine/core'

import postApi from '../../../services/postApi'
import Form from '../Form'

const NewPost = () => {
  const notifications = useNotifications()
  const [loading, setLoading] = useState(true)

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
    <div className='relative'>
      <LoadingOverlay visible={loading} />
      <Form onSubmit={onSubmit} loading={loading} />
    </div>
  )
}

export default NewPost
