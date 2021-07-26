import React, { useState, useEffect } from 'react'

import Layout from '../../components/admin/Layout'
import Form from '../../domain/settings/Form'
import { EditResource } from '../../components/admin/Resource'
import { data } from '../../states/session'

import settingsApi from '../../services/settingsApi'

const Profile = () => {
  const session = data.use()
  const [settings, setSettings] = useState(null)

  useEffect(async () => {
    if (session) {
      settingsApi()
        .getSettings()
        .then(({ data }) => setSettings(data.result))
        .catch(() => null)
    }
  }, [session])

  return (
    <Layout page="Settings">
      <EditResource
        Form={Form}
        name="settings"
        content={settings}
        title="Site Settings"
      />
    </Layout>
  )
}

export default Profile
