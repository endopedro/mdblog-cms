import React, { useState } from 'react'
import Link from 'next/link'
import { Paper, Table, LoadingOverlay } from '@mantine/core'

import { ResourceList } from '../../../components/admin/Resource'
import SearchPopover from '../../../components/admin/SearchPopover'
import TableActions from '../../../components/admin/TableActions'

const AllEditorsTab = () => {
  const [search, setSearch] = useState('')

  return (
    <Paper padding="lg" shadow="xs" className="relative">
      <ResourceList name="users">
        {({ items, deleteItem, loading }) => (
          <Table highlightOnHover className="relative">
            <LoadingOverlay visible={loading} />
            <thead>
              <tr>
                <th>Name</th>
                <th className="hidden md:table-cell">Username</th>
                <th>
                  <SearchPopover value={search} setValue={setSearch} />
                </th>
              </tr>
            </thead>
            <tbody>
              {items
                ?.filter((editor) =>
                  editor.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((editor) => {
                  return (
                    <Link href={`/editors/${editor.username}`} key={editor._id}>
                      <tr className="cursor-pointer">
                        <td>{editor.name}</td>
                        <td className="hidden md:table-cell">
                          {editor.username}
                        </td>
                        <td>
                          <td className="truncate">
                            <TableActions
                              onDelete={() => deleteItem(editor._id)}
                            />
                          </td>
                        </td>
                      </tr>
                    </Link>
                  )
                })}
            </tbody>
          </Table>
        )}
      </ResourceList>
    </Paper>
  )
}

export default AllEditorsTab
