import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Paper, Table, ActionIcon } from '@mantine/core'
import { RiDeleteBin5Line, RiEyeLine } from 'react-icons/ri'

import formatDate from '../../../utils/formatDate'
import { data } from '../../../states/posts'

const AllPostsTab = () => {
  const posts = data.use()

  return (
    <Paper padding="lg" shadow="xs">
      <Table highlightOnHover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Slug</th>
            {/* <th>Date</th> */}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {posts?.map((post) => (
            <Link href={`/admin/posts/${post.slug}`} key={post._id}>
              <tr className="cursor-pointer">
                <td>{post.title}</td>
                <td>{post.slug}</td>
                {/* <td>{formatDate(post.date)}</td> */}
                <td>
                  <div className="flex">
                    <ActionIcon
                      color="red"
                      radius="lg"
                      className="mr-2"
                      onClick={(e) => e.stopPropagation()}
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
