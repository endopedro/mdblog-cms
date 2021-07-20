import React from 'react'
import { Image, Loader, ActionIcon } from '@mantine/core'
import InfiniteScroll from 'react-infinite-scroller'
import { RiCloseFill } from 'react-icons/ri'

const Gallery = ({ images, totalPages, totalImages, deleteImage }) => {
  return (
    <>
      {images ? (
        <InfiniteScroll
          pageStart={1}
          loadMore={async (page) => {
            if (page <= totalPages) await fetchResource(page)
          }}
          hasMore={images.length < totalImages}
          loader={<Loader className="mx-auto" />}
        >
          <div className="grid grid-cols-3 gap-4 mb-7">
            {images.map((image) => (
              <div className="relative" key={image._id}>
                <Image height={80} radius="sm" src={image.secure_url} />
                <ActionIcon
                  className="absolute -right-1 -bottom-1"
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
