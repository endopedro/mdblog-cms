import React, { useState } from 'react'
import Link from 'next/link'
import { Paper, Table, ActionIcon, LoadingOverlay } from '@mantine/core'
import { RiDeleteBin5Line, RiEyeLine } from 'react-icons/ri'

import formatDate from '../../../utils/formatDate'
import { ResourceList } from '../../../components/admin/Resource'
import SearchPopover from '../../../components/SearchPopover'

const AllPostsTab = () => {
  const [search, setSearch] = useState('')

  return (
    <Paper padding="lg" shadow="xs" className="relative">
      <ResourceList name="posts">
        {({ items, deleteItem, loading }) => (
          <Table highlightOnHover className="relative">
            <LoadingOverlay visible={loading} />
            <thead>
              <tr>
                <th>Title</th>
                <th className="hidden md:table-cell">Slug</th>
                <th className="hidden md:table-cell">Date</th>
                <th>
                  <SearchPopover value={search} setValue={setSearch} />
                </th>
              </tr>
            </thead>
            <tbody>
              {items
                ?.filter((post) =>
                  post.title.toLowerCase().includes(search.toLowerCase())
                )
                .map((post) => (
                  <Link href={`/admin/posts/${post.slug}`} key={post._id}>
                    <tr className="cursor-pointer">
                      <td>{post.title}</td>
                      <td className="hidden md:table-cell">{post.slug}</td>
                      <td className="hidden md:table-cell">
                        {formatDate(post.createdAt)}
                      </td>
                      <td>
                        <ActionIcon
                          color="red"
                          radius="lg"
                          className="md:mr-2 float-left"
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
                          className="float-left"
                        >
                          <RiEyeLine />
                        </ActionIcon>
                      </td>
                    </tr>
                  </Link>
                ))}
            </tbody>
          </Table>
        )}
      </ResourceList>
    </Paper>
  )
}

export default AllPostsTab
