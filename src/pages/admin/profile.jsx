import React, { useState, useEffect } from 'react'
import { RiCloseLine, RiCheckLine } from 'react-icons/ri'
import { useNotifications } from '@mantine/notifications'
import { Title, Divider, LoadingOverlay } from '@mantine/core'

import Layout from '../../components/admin/Layout'
import Form from '../../domain/editors/Form'
import { data, load } from '../../states/session'

const Profile = () => {
  const session = data.use()
  const loading = load.use()
  const notifications = useNotifications()

  const notify = (success = true, message) => {
    notifications.showNotification({
      title: success ? 'Success' : 'Fail',
      message: success ? 'Editor Updated' : 'Something went wrong',
      color: success ? 'blue' : 'red',
      icon: success ? <RiCheckLine /> : <RiCloseLine />,
    })
  }

  const onSubmit = async (data) => {
    const isProfileUpdated = await editUser(data)
    notify(isProfileUpdated)
  }

  return (
    <Layout page="Profile">
      <LoadingOverlay visible={loading} />
      <Title order={3}>Edit Profile</Title>
      <Divider className="mb-5 mt-2" />
      {session && (
        <Form onSubmit={onSubmit} loading={loading} profile={session} />
      )}
    </Layout>
  )
}

export default Profile
