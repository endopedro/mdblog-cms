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

export const data = entity(fetchPosts())

export const setPosts = (newData) => data.set(newData)
