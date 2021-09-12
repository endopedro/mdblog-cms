import React from 'react'
import { Image, Loader, ActionIcon } from '@mantine/core'
import InfiniteScroll from 'react-infinite-scroller'
import { RiCloseFill } from 'react-icons/ri'

const Gallery = ({
  images,
  totalPages,
  totalImages,
  deleteImage,
  onSelect,
  fetchImages,
}) => {
  return (
    <>
      {images ? (
        <InfiniteScroll
          className="relative"
          pageStart={1}
          loadMore={async (page) => {
            if (page <= totalPages) await fetchImages(page)
          }}
          hasMore={images.length < totalImages}
          loader={
            <Loader
              variant="dots"
              className="absolute -bottom-3 right-1/2 transform translate-x-1/2"
            />
          }
        >
          <div className="grid grid-cols-3 gap-4 mb-5 pr-2 max-h-80 overflow-y-auto">
            {images.map((image) => (
              <div className="relative" key={image._id}>
                <Image
                  className="cursor-pointer"
                  height={80}
                  radius="sm"
                  src={image.secure_url}
                  onClick={() => onSelect(image)}
                />
                <ActionIcon
                  className="absolute right-0 bottom-0"
                  variant="filled"
                  color="red"
                  radius="xl"
                  onClick={() => deleteImage(image.public_id)}
                >
                  <RiCloseFill />
                </ActionIcon>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <Loader className="mx-auto mb-7" />
      )}
    </>
  )
}

export default Gallery
