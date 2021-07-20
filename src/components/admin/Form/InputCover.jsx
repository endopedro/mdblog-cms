import React, { useState } from 'react'
import { Image, Button, ActionIcon } from '@mantine/core'
import { useFormContext } from 'react-hook-form'
import cx from 'classnames'
import { RiCloseFill, RiEdit2Fill } from 'react-icons/ri'

import GalleryModal from '../GalleryModal'

const InputCover = ({ className, name }) => {
  const methods = useFormContext()
  const [opened, setOpened] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  const onSelect = (image) => {
    methods.setValue(name, image ? image._id : null)
    setSelectedImage(image)
    setOpened(false)
  }

  return (
    <div className={cx('relative', className)}>
      <input type="hidden" {...methods.register(name)} />
      <Image
        // width={200}
        height={120}
        src={selectedImage?.secure_url}
        alt="With default placeholder"
        withPlaceholder
        styles={{ placeholder: { backgroundColor: '#1D1E30' } }}
        radius="md"
        placeholder={
          <Button variant="outline" onClick={setOpened}>
            Upload Cover
          </Button>
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
        onSelect={onSelect}
        selectedImage={selectedImage}
      />
    </div>
  )
}

export default InputCover
