import React from 'react'
import Link from 'next/link'
import { Paper, Table, ActionIcon, LoadingOverlay } from '@mantine/core'
import { RiDeleteBin5Line, RiEyeLine } from 'react-icons/ri'

import formatDate from '../../../utils/formatDate'
import Resource from '../../../components/admin/Resource'

const AllPostsTab = () => (
  <Paper padding="lg" shadow="xs" className="relative">
    <Resource>
      {({ items, deleteItem }) => (
        <Table highlightOnHover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Slug</th>
              <th>Date</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {items?.map((post) => (
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
                          deleteItem(post._id)
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
      )}
    </Resource>
  </Paper>
)

export default AllPostsTab
