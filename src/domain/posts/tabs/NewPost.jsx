import React from 'react'
import { RiCloseLine, RiCheckLine } from 'react-icons/ri'
import { useNotifications } from '@mantine/notifications'
import { LoadingOverlay } from '@mantine/core'

import Form from '../Form'
import { load, newPost } from '../../../states/posts'

const NewPost = ({ setActiveTab }) => {
  const notifications = useNotifications()
  const loading = load.use()

  const notify = (success = true, message) => {
    notifications.showNotification({
      title: success ? 'Success' : 'Fail',
      message: success ? 'Post Created' : 'Something went wrong',
      color: success ? 'blue' : 'red',
      icon: success ? <RiCheckLine /> : <RiCloseLine />,
    })
  }

  const onSubmit = async (data) => {
    const isPostCreated = await newPost(data)
    notify(isPostCreated)
    if (isPostCreated) setActiveTab(0)
  }

  return ( 
    <div className="relative">
      <LoadingOverlay visible={loading} />
      <Form onSubmit={onSubmit} loading={loading} />
    </div>
  )
}

export default NewPost
