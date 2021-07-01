import React from 'react'
import Link from 'next/link'
import { Paper, Table, ActionIcon, LoadingOverlay } from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import {
  RiDeleteBin5Line,
  RiEyeLine,
  RiCloseLine,
  RiCheckLine,
} from 'react-icons/ri'

import { data, load, deletePost } from '../../../states/categories'

const AllCategoriesTab = () => {
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
            <Link href={`/admin/categories/${category._id}`} key={category._id}>
              <tr className="cursor-pointer">
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
                      Posts
                      Posts
                      onClick={(e) => e.stopPropagation()}
                    >
                      <RiEyeLine />
                    </ActionIcon>
                  </div>
                </td>
              </tr>
            </Link>
          ))}
        </tbody>
      </Table>
    </Paper>
  )
}

export default AllCategoriesTab
