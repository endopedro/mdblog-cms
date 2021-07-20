import React from 'react'
import { Image, Button } from '@mantine/core'
import { useFormContext } from 'react-hook-form'

import GalleryModal from '../GalleryModal'

const InputCover = ({ className, name }) => {
  const methods = useFormContext()

  return (
    <div className={className}>
      <input type="hidden" {...methods.register(name)} />
      <Image
        // width={200}
        height={120}
        src={null}
        alt="With default placeholder"
        withPlaceholder
        styles={{ placeholder: { backgroundColor: '#1D1E30' } }}
        radius="md"
        placeholder={<Button variant="outline">Upload Cover</Button>}
      />
      <GalleryModal />
    </div>
  )
}

export default InputCover
