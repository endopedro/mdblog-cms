import React, { useState, useEffect } from 'react'
import { Modal, LoadingOverlay } from '@mantine/core'
import Gallery from './Gallery'
import { useNotifications } from '@mantine/notifications'
import { RiCloseLine, RiCheckLine } from 'react-icons/ri'

import DropZone from '../Dropzone'
import imageApi from '../../../services/imageApi'

const GalleryModal = ({ opened, setOpened, onSelect, selectedImage }) => {
  const [images, setImages] = useState(null)
  const [totalPages, setTotalPages] = useState(1)
  const [totalImages, setTotalImages] = useState(0)
  const [loading, setLoading] = useState(false)
  const notifications = useNotifications()

  const notify = (success, message) => {
    notifications.showNotification({
      title: success ? 'Success' : 'Fail',
      message: message,
      color: success ? 'blue' : 'red',
      icon: success ? <RiCheckLine /> : <RiCloseLine />,
    })
  }

  const fetchImages = async (page) => {
    await imageApi()
      .getImages(page)
      .then(({ data }) => {
        setTotalImages(data.total)
        setTotalPages(data.pages)
        setImages((prevState) =>
          images ? [...prevState, ...data.result] : data.result
        )
      })
      .catch(({ response }) => notify(false, response.data.message))
  }

  const deleteImage = async (public_id) => {
    setLoading(true)
    await imageApi()
      .deleteImage(public_id)
      .then(({ data }) => {
        setImages((prevState) => [
          ...prevState.filter(
            (image) => image.public_id != data.result.public_id
          ),
        ])
        setTotalImages((prevState) => prevState - 1)
        if (selectedImage.public_id == public_id) onSelect(null)
        notify(true, 'Image deleted')
      })
      .catch(({ response }) => notify(false, response.data.message))
      .finally(() => setLoading(false))
  }

  const createImage = async (image) => {
    setLoading(true)
    await imageApi()
      .createImage(image)
      .then(({ data }) => {
        setImages((prevState) => [...prevState, data.result])
        setTotalImages((prevState) => prevState + 1)
        notify(true, 'Image uploaded')
      })
      .catch(({ response }) => notify(false, response.data.message))
      .finally(() => setLoading(false))
  }

  useEffect(async () => await fetchImages(1), [])

  return (
    <Modal
      className="position-relative"
      size="md"
      overflow="inside"
      opened={!!opened}
      onClose={() => setOpened(false)}
      title="Media Gallery"
    >
      <LoadingOverlay visible={loading} />
      <Gallery
        images={images}
        totalImages={totalImages}
        totalPages={totalPages}
        deleteImage={deleteImage}
        onSelect={onSelect}
      />
      <DropZone onDrop={createImage} />
    </Modal>
  )
}

export default GalleryModal
