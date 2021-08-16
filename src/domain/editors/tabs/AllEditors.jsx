import React, { useState } from 'react'
import Link from 'next/link'
import { Paper, Table, ActionIcon, LoadingOverlay } from '@mantine/core'
import { RiDeleteBin5Line, RiEyeLine } from 'react-icons/ri'

import { ResourceList } from '../../../components/admin/Resource'
import SearchPopover from '../../../components/admin/SearchPopover'

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
                <th className="hidden md:table-cell">Email</th>
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
                .map((editor) => (
                  <Link href={`/editors/${editor._id}`} key={editor._id}>
                    <tr className="cursor-pointer">
                      <td>{editor.name}</td>
                      <td className="hidden md:table-cell">{editor.email}</td>
                      <td>
                        <div className="flex">
                          <ActionIcon
                            color="red"
                            radius="lg"
                            className="md:mr-2 float-left"
                            onClick={async (e) => {
                              e.stopPropagation()
                              deleteItem(editor._id)
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
                        </div>
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

export default AllEditorsTab
