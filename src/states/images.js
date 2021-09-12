import { entity } from 'simpler-state'
import imageApi from '../services/imageApi'

const fetchImages = async () =>
  await imageApi()
    .getImages(1)
    .then(({ data }) => {
      setTotalImages(data.total)
      setTotalPages(data.pages)
      return data.result
    })
    .catch(() => null)

export const data = entity(fetchImages())
export const nPages = entity(1)
export const nImages = entity(0)

export const setImages = (newData) => data.set(newData)
export const setTotalPages = (newData) => nPages.set(newData)
export const setTotalImages = (newData) => nImages.set(newData)
