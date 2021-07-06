import { entity } from 'simpler-state'

import userApi from '../services/userApi'

export const load = entity(false)

const fetchUsers = async () => {
  load.set(true)
  const data = await userApi()
    .getUsers()
    .then(({ data }) => data.users)
    .catch(() => null)
  load.set(false)
  return data
}

const destroyUser = async (email) => {
  load.set(true)
  const data = await userApi()
    .deleteUser(email)
    .then(({ data }) => data.user)
    .catch(() => null)
  load.set(false)
  return data
}

const createUser = async (data) => {
  load.set(true)
  const response = await userApi()
    .registerUser(data)
    .then(({ data }) => data.user)
    .catch(() => null)
  load.set(false)
  return response
}

const updateUser = async (data) => {
  load.set(true)
  const response = await userApi()
    .updateUser(data)
    .then(({ data }) => data.user.value)
    .catch(() => null)
  load.set(false)
  return response
}

export const data = entity(fetchUsers())

export const setUsers = (newData) => data.set(newData)
export const setLoading = (status) => load.set(status)

export const deleteUser = async (email) => {
  const deletedUser = await destroyUser(email)
  if (deletedUser) {
    setUsers((prevState) => [
      ...prevState.filter((user) => user.email != deletedUser.email),
    ])
    return true
  }
  return false
}

export const newUser = async (data) => {
  const createdUser = await createUser(data)
  if (createdUser) {
    setUsers((prevState) => [...prevState, createdUser])
    return true
  }
  return false
}

export const editUser = async (data) => {
  const editedUser = await updateUser(data)
  if (editedUser) {
    setUsers((prevState) => {
      const usersArray = [...prevState]
      const index = prevState.findIndex((el) => el._id === data._id)
      usersArray.splice(index, 1, data)
      return usersArray
    })
    return true
  }
  return false
}
