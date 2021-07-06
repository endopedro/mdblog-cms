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

import { data, load, deleteUser } from '../../../states/users'

const AllEditorsTab = () => {
  const editors = data.use()
  const loading = load.use()
  const notifications = useNotifications()

  const notify = (success) => {
    notifications.showNotification({
      title: success ? 'Success' : 'Fail',
      message: success ? 'Editor Deleted' : 'Something went wrong',
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
            <th>Name</th>
            <th>Email</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {editors?.map((editor) => (
            <Link href={`/admin/editors/${editor.email}`} key={editor._id}>
              <tr className="cursor-pointer">
                <td>{editor.name}</td>
                <td>{editor.email}</td>
                <td>
                  <div className="flex">
                    <ActionIcon
                      color="red"
                      radius="lg"
                      className="mr-2"
                      onClick={async (e) => {
                        e.stopPropagation()
                        notify(await deleteUser(editor.email))
                      }}
                    >
                      <RiDeleteBin5Line className="text-red-400" />
                    </ActionIcon>
                    <ActionIcon
                      radius="lg"
                      color="blue"
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

export default AllEditorsTab
