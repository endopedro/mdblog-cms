import { entity } from 'simpler-state'

import settingApi from '../services/settingsApi'

const fetchSettings = async () =>
  await settingApi()
    .getSettings()
    .then(({ data }) => data.result)
    .catch(() => null)

export const data = entity(fetchSettings())

export const updateSettings = (newData) => data.set(newData)
