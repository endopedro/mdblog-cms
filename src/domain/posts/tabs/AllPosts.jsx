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

import formatDate from '../../../utils/formatDate'
import { data, load, deletePost } from '../../../states/posts'

const AllPostsTab = () => {
  const posts = data.use()
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
            <th>Title</th>
            <th>Slug</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {posts?.map((post) => (
            <Link href={`/admin/posts/${post.slug}`} key={post._id}>
              <tr className="cursor-pointer">
                <td>{post.title}</td>
                <td>{post.slug}</td>
                <td>{formatDate(post.createdAt)}</td>
                <td>
                  <div className="flex">
                    <ActionIcon
                      color="red"
                      radius="lg"
                      className="mr-2"
                      onClick={async (e) => {
                        e.stopPropagation()
                        notify(await deletePost(post.slug))
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

export default AllPostsTab
