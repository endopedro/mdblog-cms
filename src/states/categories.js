import { entity } from 'simpler-state'

import categoryApi from '../services/categoryApi'

export const load = entity(false)

const fetchCategories = async () => {
  load.set(true)
  const data = await categoryApi()
    .getCategories()
    .then(({ data }) => data.categories)
    .catch(() => null)
  load.set(false)
  return data
}

const destroyCategory = async (id) => {
  load.set(true)
  const data = await categoryApi()
    .deleteCategory(id)
    .then(({ data }) => data.category)
    .catch(() => null)
  load.set(false)
  return data
}

const createCategory = async (data) => {
  load.set(true)
  const response = await categoryApi()
    .createCategory(data)
    .then(({ data }) => data.category)
    .catch(() => null)
  load.set(false)
  return response
}

const updateCategory = async (data) => {
  load.set(true)
  const response = await categoryApi()
    .updateCategory(data)
    .then(({ data }) => data.category.value)
    .catch(() => null)
  load.set(false)
  return response
}

export const data = entity(fetchCategories())

export const setCategories = (newData) => data.set(newData)
export const setLoading = (status) => load.set(status)

export const deleteCategory = async (id) => {
  const deletedCategory = await destroyCategory(id)
  if (deletedCategory) {
    setCategories((prevState) => [
      ...prevState.filter((category) => category._id != deletedCategory._id),
    ])
    return true
  }
  return false
}

export const newCategory = async (data) => {
  const createdCategory = await createCategory(data)
  if (createdCategory) {
    setCategories((prevState) => [...prevState, createdCategory])
    return true
  }
  return false
}

export const editCategory = async (data) => {
  const editedCategory = await updateCategory(data)
  if (editedCategory) {
    setCategories((prevState) => {
      const categoriesArray = [...prevState]
      const index = prevState.findIndex((el) => el._id === data._id)
      categoriesArray.splice(index, 1, data)
      return categoriesArray
    })
    return true
  }
  return false
}
