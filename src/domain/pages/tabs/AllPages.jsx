import React, { useState } from 'react'
import Link from 'next/link'
import { Paper, Table, LoadingOverlay } from '@mantine/core'

import formatDate from '../../../utils/formatDate'
import { ResourceList } from '../../../components/admin/Resource'
import SearchPopover from '../../../components/admin/SearchPopover'
import TableActions from '../../../components/admin/TableActions'

const AllPagesTab = () => {
  const [search, setSearch] = useState('')

  return (
    <Paper padding="lg" shadow="xs" className="relative">
      <ResourceList name="pages">
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
                ?.filter((page) =>
                  page.title.toLowerCase().includes(search.toLowerCase())
                )
                .map((page) => (
                  <Link href={`/pages/${page.slug}`} key={page._id}>
                    <tr className="cursor-pointer">
                      <td>{page.title}</td>
                      <td className="hidden md:table-cell truncate">
                        {formatDate(page.createdAt)}
                      </td>
                      <td className="truncate">
                        <TableActions onDelete={() => deleteItem(page._id)} />
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

export default AllPagesTab
