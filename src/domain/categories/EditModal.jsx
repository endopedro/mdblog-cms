import React from 'react'
import { Modal, LoadingOverlay } from '@mantine/core'
import { RiCloseLine, RiCheckLine } from 'react-icons/ri'
import { useNotifications } from '@mantine/notifications'

import { load, editCategory } from '../../states/categories'
import Form from './Form'

const EditModal = ({ handleModal }) => {
  const loading = load.use()
  const notifications = useNotifications()

  const notify = (success) => {
    notifications.showNotification({
      title: success ? 'Success' : 'Fail',
      message: success ? 'Category Updated' : 'Something went wrong',
      color: success ? 'blue' : 'red',
      icon: success ? <RiCheckLine /> : <RiCloseLine />,
    })
  }

  const onSubmit = async (data) => {
    const isCategoryUpdated = await editCategory(data)
    notify(isCategoryUpdated)
    handleModal.set(false)
  }

  return (
    <Modal
      opened={handleModal.state}
      onClose={() => handleModal.set(false)}
      title="Edit Category"
    >
      <LoadingOverlay visible={loading} />
      <Form category={handleModal.state} onSubmit={onSubmit} />
    </Modal>
  )
}

export default EditModal
