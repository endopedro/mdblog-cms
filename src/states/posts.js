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
