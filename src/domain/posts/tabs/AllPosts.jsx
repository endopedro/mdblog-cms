import React, { useState } from 'react'
import Link from 'next/link'
import { Paper, Table, LoadingOverlay } from '@mantine/core'

import formatDate from '../../../utils/formatDate'
import { ResourceList } from '../../../components/admin/Resource'
import SearchPopover from '../../../components/admin/SearchPopover'
import TableActions from '../../../components/admin/TableActions'

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
                  <Link href={`/posts/${post.slug}`} key={post._id}>
                    <tr className="cursor-pointer ">
                      <td>{post.title}</td>
                      <td className="hidden md:table-cell truncate">
                        {formatDate(post.createdAt)}
                      </td>
                      <td className="truncate">
                        <TableActions
                          onDelete={() => deleteItem(post._id)}
                          onWatch={post.slug}
                        />
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
