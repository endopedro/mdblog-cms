import React, { useState } from 'react'
import { RiCloseLine, RiCheckLine } from 'react-icons/ri'
import { useNotifications } from '@mantine/notifications'
import { Title, Divider, LoadingOverlay } from '@mantine/core'

import api from '../../../services/api'

const EditResource = ({ Form, name, content, title, callback }) => {
  const [loading, setLoading] = useState(false)
  const notifications = useNotifications()

  const notify = (success = true, message) => {
    notifications.showNotification({
      title: success ? 'Success' : 'Fail',
      message: message,
      color: success ? 'blue' : 'red',
      icon: success ? <RiCheckLine /> : <RiCloseLine />,
    })
  }

  const onSubmit = async (data) => {
    setLoading(true)
    await api
      .put(name, data)
      .then(({ data }) => {
        notify(true, 'Item Updated')
        callback?.(data.result)
      })
      .catch(({ response }) => notify(false, response.data.message))
      .finally(() => setLoading(false))
  }

  return (
    <div className="relative">
      <LoadingOverlay visible={loading} />
      {title && <Title order={3}>{title}</Title>}
      {title && <Divider className="mb-5 mt-2" />}
      {content && (
        <Form onSubmit={onSubmit} loading={loading} content={content} />
      )}
    </div>
  )
}

export default EditResource
