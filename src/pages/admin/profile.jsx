import React, { useState, useEffect } from 'react'
import { RiCloseLine, RiCheckLine } from 'react-icons/ri'
import { useNotifications } from '@mantine/notifications'
import { Title, Divider, Loader } from '@mantine/core'

import Layout from '../../components/admin/Layout'
import Form from '../../domain/profile/Form'
import { data } from '../../states/session'
import userApi from '../../services/userApi'

const Profile = () => {
  const session = data.use()
  const notifications = useNotifications()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(false)

  const notify = (success = true, message) => {
    notifications.showNotification({
      title: success ? 'Success' : 'Fail',
      message: success ? 'Profile Updated' : message,
      color: success ? 'blue' : 'red',
      icon: success ? <RiCheckLine /> : <RiCloseLine />,
    })
  }

  const onSubmit = async (data) => {
    setLoading(true)
    await userApi()
      .updateUser({ ...data, profile: true })
      .then(() => notify(true))
      .catch((error) => notify(false, error.response.data.message))
    setLoading(false)
  }

  useEffect(async () => {
    if (session) {
      setLoading(true)
      const user = await userApi()
        .getUser(session.user.id)
        .then(({ data }) => data.user)
      setProfile(user)
      setLoading(false)
    }
  }, [session])

  return (
    <Layout page="Profile">
      <div className="relative">
        <Title order={3}>Edit Profile</Title>
        <Divider className="mb-5 mt-2" />
        {profile ? (
          <Form onSubmit={onSubmit} loading={loading} profile={profile} />
        ) : (
          <Loader className="mx-auto" />
        )}
      </div>
    </Layout>
  )
}

export default Profile
