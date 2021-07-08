import { entity } from 'simpler-state'

export const data = entity(null)

export const setSession = (session) => data.set(session)
