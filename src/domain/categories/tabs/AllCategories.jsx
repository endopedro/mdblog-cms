import React, { useState } from 'react'
import { Paper, Table, ActionIcon, LoadingOverlay } from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import {
  RiDeleteBin5Line,
  RiCloseLine,
  RiCheckLine,
  RiEdit2Line,
} from 'react-icons/ri'

import { data, load, deletePost } from '../../../states/categories'

import EditModal from '../EditModal'

const AllCategoriesTab = () => {
  const [showModal, setShowModal] = useState(false)
  const categories = data.use()
  const loading = load.use()
  const notifications = useNotifications()

  const notify = (success) => {
    notifications.showNotification({
      title: success ? 'Success' : 'Fail',
      message: success ? 'Post Deleted' : 'Something went wrong',
      color: success ? 'blue' : 'red',
      icon: success ? <RiCheckLine /> : <RiCloseLine />,
    })
  }

  return (
    <>
      <Paper padding="lg" shadow="xs" className="relative">
        <LoadingOverlay visible={loading} />
        <Table highlightOnHover>
          <thead>
            <tr>
              <th>Category</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {categories?.map((category) => (
              <tr>
                <td>{category.label}</td>
                <td>
                  <div className="flex">
                    <ActionIcon
                      color="red"
                      radius="lg"
                      className="mr-2"
                      onClick={async (e) => {
                        e.stopPropagation()
                        notify(await deletePost(category._id))
                      }}
                    >
                      <RiDeleteBin5Line className="text-red-400" />
                    </ActionIcon>
                    <ActionIcon
                      radius="lg"
                      color="blue"
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowModal(category)
                      }}
                    >
                      <RiEdit2Line />
                    </ActionIcon>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Paper>
      <EditModal handleModal={{ state: showModal, set: setShowModal }} />
    </>
  )
}

export default AllCategoriesTab
