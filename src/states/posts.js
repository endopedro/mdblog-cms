import { entity } from 'simpler-state'

import postApi from '../services/postApi'

export const load = entity(false)

const fetchPosts = async () => {
  load.set(true)
  const data = await postApi()
    .getPosts()
    .then(({ data }) => data.posts)
    .catch(() => null)
  load.set(false)
  return data
}

const destroyPost = async (slug) => {
  load.set(true)
  const data = await postApi()
    .deletePost(slug)
    .then(({ data }) => data.post)
    .catch(() => null)
  load.set(false)
  return data
}

const createPost = async (data) => {
  load.set(true)
  const response = await postApi()
    .createPost(data)
    .then(({data})=> data.post)
    .catch(() => null)
  load.set(false)
  return response
}
  
export const data = entity(fetchPosts())

export const setPosts = (newData) => data.set(newData)

export const deletePost = async (slug) => {
  const deletedPost = await destroyPost(slug)
  if (deletedPost) {
    setPosts((prevState) => [
      ...prevState.filter((post) => post.slug != deletedPost.slug),
    ])
    return true
  }
  return false
}

export const newPost = async (data) => {
  const createdPost = await createPost(data)
  if (createdPost) {
    setPosts((prevState) => [...prevState, createdPost])
    return true
  }
  return false
}
