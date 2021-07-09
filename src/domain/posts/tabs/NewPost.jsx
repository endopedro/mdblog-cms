import React, { useState } from 'react'
import { RiCloseLine, RiCheckLine } from 'react-icons/ri'
import { useNotifications } from '@mantine/notifications'
import { LoadingOverlay } from '@mantine/core'

import Form from '../Form'
import api from '../../../services/api'

const NewPost = ({ setActiveTab }) => {
  const [loading, setLoading] = useState(false)
  const notifications = useNotifications()

  const notify = (success = true, message) => {
    notifications.showNotification({
      title: success ? 'Success' : 'Fail',
      message: success ? 'Post Created' : 'Something went wrong',
      color: success ? 'blue' : 'red',
      icon: success ? <RiCheckLine /> : <RiCloseLine />,
    })
  }

  const onSubmit = async (data) => {
    setLoading(true)
    await api
      .post('/posts', data)
      .then(({ data }) => {
        notify(true, 'Post created')
        setActiveTab(0)
      })
      .catch(({ response }) => notify(false, response.data.message))
      .finally(() => setLoading(false))
  }

  return (
    <div className="relative">
      <LoadingOverlay visible={loading} />
      <Form onSubmit={onSubmit} loading={loading} />
    </div>
  )
}

export default NewPost
