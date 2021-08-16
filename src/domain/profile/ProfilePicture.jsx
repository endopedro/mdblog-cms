import React, { useState } from 'react'
import { Text, Image, Loader } from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import { RiImageAddLine } from 'react-icons/ri'
import { RiCloseLine, RiCheckLine } from 'react-icons/ri'

import Dropzone from '../../components/admin/Dropzone'
import imageApi from '../../../services/imageApi'

const ProfilePicture = ({ className, picture }) => {
  const notifications = useNotifications()
  const [loading, setLoading] = useState(false)
  const [profilePicture, setProfilePicture] = useState(picture)

  const notify = (success, message) => {
    notifications.showNotification({
      title: success ? 'Success' : 'Fail',
      message: message,
      color: success ? 'blue' : 'red',
      icon: success ? <RiCheckLine /> : <RiCloseLine />,
    })
  }

  const onDrop = async (image) => {
    setLoading(true)
    await imageApi()
      .updateAvatar(image)
      .then(({ data }) => {
        setProfilePicture(data.result)
        notify(true, 'Image uploaded')
      })
      .catch(({ response }) => notify(false, response.data.message))
      .finally(() => setLoading(false))
  }

  return (
    <div className={className}>
      <Text className="mb-2" size="sm">
        Picture
      </Text>
      <div className="w-24 mx-auto">
        <Dropzone onDrop={onDrop}>
          {loading ? (
            <Loader />
          ) : (
            <Image
              className="cursor-pointer h-full w-full"
              src={profilePicture?.secure_url}
              alt="profile picture"
              withPlaceholder
              radius="sm"
              placeholder={<RiImageAddLine size={30} />}
            />
          )}
        </Dropzone>
      </div>
    </div>
  )
}

export default ProfilePicture
