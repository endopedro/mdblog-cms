import { entity } from 'simpler-state'
import postApi from '../services/postApi'

const fetchPosts = async () => {
  try {
    const data = await postApi()
      .getPosts()
      .then(({ data }) => data.posts)
    return data
  } catch {
    return null
  }
}

const destroyPost = async (slug) => {
  try {
    const deletedPost = await postApi()
      .deletePost(slug)
      .then(({ data }) => data.post)
    return deletedPost
  } catch {
    return null
  }
}

export const data = entity(fetchPosts())

export const setPosts = (newData) => data.set(newData)

export const deletePost = async (slug) => {
  const deletedPost = await destroyPost(slug)
  if (deletedPost) {
    console.log(deletedPost)
    setPosts((prevState) => [
      ...prevState.filter((post) => post.slug != deletedPost.slug),
    ])
  }
}
