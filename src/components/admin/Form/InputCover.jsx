import React, { useState, useEffect } from 'react'
import { Image, Button, ActionIcon, Text, Loader } from '@mantine/core'
import { useFormContext } from 'react-hook-form'
import { RiCloseFill, RiEdit2Fill } from 'react-icons/ri'
import cx from 'classnames'

import GalleryModal from '../GalleryModal'
import imageApi from '../../../services/imageApi'

const InputCover = ({ className, name }) => {
  const methods = useFormContext()
  const [opened, setOpened] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [loadingImage, setLoadingImage] = useState(false)

  const onSelect = (image) => {
    methods.setValue(name, image ? image._id : null)
    setSelectedImage(image)
    setOpened(false)
  }

  const onDelete = (public_id) => {
    if (selectedImage?.public_id == public_id) onSelect(null)
  }

  useEffect(() => {
    const cover = methods.getValues(name)
    if (cover) {
      setLoadingImage(true)
      imageApi()
        .getImage(methods.getValues(name))
        .then(({ data }) => setSelectedImage(data.result))
        .catch((e) => console.log(e))
        .finally(() => setLoadingImage(false))
    }
  }, [])

  return (
    <>
      <Text className="mb-1" size="sm">
        Cover image
      </Text>
      <div className={cx('relative', className)}>
        <input type="hidden" {...methods.register(name)} />
        <Image
          // width={200}
          height={120}
          src={selectedImage?.secure_url}
          alt="cover image"
          withPlaceholder
          styles={{ placeholder: { backgroundColor: '#1D1E30' } }}
          radius="md"
          placeholder={
            loadingImage ? (
              <Loader />
            ) : (
              <Button variant="outline" onClick={setOpened}>
                Upload Cover
              </Button>
            )
          }
        />
        {selectedImage && (
          <div className="absolute right-0 bottom-0 flex">
            <ActionIcon
              variant="filled"
              color="blue"
              radius="xl"
              onClick={() => setOpened(true)}
            >
              <RiEdit2Fill />
            </ActionIcon>
            <ActionIcon
              className="ml-1"
              variant="filled"
              color="red"
              radius="xl"
              onClick={() => onSelect(null)}
            >
              <RiCloseFill />
            </ActionIcon>
          </div>
        )}
        <GalleryModal
          opened={opened}
          setOpened={setOpened}
          onDelete={onDelete}
          onSelect={onSelect}
          selectedImage={selectedImage}
        />
      </div>
    </>
  )
}

export default InputCover
