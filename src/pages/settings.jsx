import React, { useState, useEffect } from 'react'

import Layout from '../components/admin/Layout'
import { EditResource } from '../components/admin/Resource'
import Form from '../domain/settings/Form'
import { data } from '../states/session'

import settingsApi from '../services/settingsApi'
import { updateSettings } from '../states/settings'

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
        callback={updateSettings}
      />
    </Layout>
  )
}

export default Profile
