import React, { useState, useEffect } from 'react'

import Layout from '../components/admin/Layout'
import Form from '../domain/profile/Form'
import { EditResource } from '../components/admin/Resource'
import { data } from '../states/session'

import userApi from '../services/userApi'

const Profile = () => {
  const session = data.use()
  const [user, setUser] = useState(null)

  useEffect(async () => {
    if (session) {
      userApi()
        .getUser(session.user._id)
        .then(({ data }) => setUser(data.result))
        .catch(() => null)
    }
  }, [session])

  return (
    <Layout page="Profile">
      <EditResource Form={Form} name="users" content={user} title="Profile" />
    </Layout>
  )
}

export default Profile
