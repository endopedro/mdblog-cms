import React, { useState, useEffect } from 'react'
import { Modal } from '@mantine/core'
import { useRouter } from 'next/router'

import categoryApi from '../../services/categoryApi'
import { EditResource } from '../../components/admin/Resource'
import Form from './Form'

const EditModal = ({ handleModal, updateItem }) => {
  const router = useRouter()
  const [category, setCategory] = useState(null)

  useEffect(async () => {
    if (handleModal.state) {
      categoryApi()
        .getCategory(handleModal.state._id)
        .then(({ data }) => setCategory(data.result))
        .catch(() => null)
    }
  }, [handleModal.state])

  return (
    <Modal
      opened={!!handleModal.state}
      onClose={() => handleModal.set(false)}
      title="Edit Category"
    >
      <EditResource
        Form={Form}
        name="categories"
        content={category}
        callback={(result) => {
          updateItem(result)
          handleModal.set(false)
        }}
      />
    </Modal>
  )
}

export default EditModal
