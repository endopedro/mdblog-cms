import { entity } from 'simpler-state'

export const load = entity(false)
export const data = entity(null)

export const setSession = (session) => data.set(session)
