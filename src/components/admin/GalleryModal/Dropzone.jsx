import React from 'react'
import { useDropzone } from 'react-dropzone'
import { Text } from '@mantine/core'

import fileToBase64 from '../../../utils/fileToBase64'

const Dropzone = ({ onDrop, onDropRejected }) => {
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: 'image/*',
    onDropRejected: () => onDropRejected?.(),
    onDrop: async (image) => {
      if (image.length) {
        const data = await fileToBase64(image[0]).then((res) => ({
          image: res,
        }))
        onDrop(data)
      }
    },
  })

  return (
    <div
      {...getRootProps({
        className:
          'dropzone border-dashed border-2 border-blue-400 h-24 rounded flex justify-center items-center w-full',
      })}
    >
      <input {...getInputProps()} />
      <Text>Drag 'n' drop image here, or click to select</Text>
    </div>
  )
}

export default Dropzone
