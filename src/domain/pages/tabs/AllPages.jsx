import React, { useState } from 'react'
import Link from 'next/link'
import { Paper, Table, ActionIcon, LoadingOverlay } from '@mantine/core'
import { RiDeleteBin5Line, RiEyeLine } from 'react-icons/ri'

import formatDate from '../../../utils/formatDate'
import { ResourceList } from '../../../components/admin/Resource'
import SearchPopover from '../../../components/SearchPopover'

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
                <th className="hidden md:table-cell">Slug</th>
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
                  <Link href={`/admin/pages/${page.slug}`} key={page._id}>
                    <tr className="cursor-pointer">
                      <td>{page.title}</td>
                      <td className="hidden md:table-cell">{page.slug}</td>
                      <td className="hidden md:table-cell">
                        {formatDate(page.createdAt)}
                      </td>
                      <td>
                        <ActionIcon
                          color="red"
                          radius="lg"
                          className="md:mr-2 float-left"
                          onClick={async (e) => {
                            e.stopPropagation()
                            deleteItem(page._id)
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

export default AllPagesTab
