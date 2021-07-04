import { entity } from 'simpler-state'

import pageApi from '../services/pageApi'

export const load = entity(false)

const fetchPages = async () => {
  load.set(true)
  const data = await pageApi()
    .getPages()
    .then(({ data }) => data.pages)
    .catch(() => null)
  load.set(false)
  return data
}

const destroyPage = async (slug) => {
  load.set(true)
  const data = await pageApi()
    .deletePage(slug)
    .then(({ data }) => data.page)
    .catch(() => null)
  load.set(false)
  return data
}

const createPage = async (data) => {
  load.set(true)
  const response = await pageApi()
    .createPage(data)
    .then(({ data }) => data.page)
    .catch(() => null)
  load.set(false)
  return response
}

const updatePage = async (data) => {
  load.set(true)
  const response = await pageApi()
    .updatePage(data)
    .then(({ data }) => data.page.value)
    .catch(() => null)
  load.set(false)
  return response
}

export const data = entity(fetchPages())

export const setPages = (newData) => data.set(newData)
export const setLoading = (status) => load.set(status)

export const deletePage = async (slug) => {
  const deletedPage = await destroyPage(slug)
  if (deletedPage) {
    setPages((prevState) => [
      ...prevState.filter((page) => page.slug != deletedPage.slug),
    ])
    return true
  }
  return false
}

export const newPage = async (data) => {
  const createdPage = await createPage(data)
  if (createdPage) {
    setPages((prevState) => [...prevState, createdPage])
    return true
  }
  return false
}

export const editPage = async (data) => {
  const editedPage = await updatePage(data)
  if (editedPage) {
    setPages((prevState) => {
      const pagesArray = [...prevState]
      const index = prevState.findIndex((el) => el._id === data._id)
      pagesArray.splice(index, 1, data)
      return pagesArray
    })
    return true
  }
  return false
}
