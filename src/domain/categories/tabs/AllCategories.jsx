import React, { useState } from 'react'
import { Paper, Table, ActionIcon, LoadingOverlay } from '@mantine/core'
import { RiDeleteBin5Line, RiEdit2Line } from 'react-icons/ri'

import EditModal from '../EditModal'
import { ResourceList } from '../../../components/admin/Resource'
import SearchPopover from '../../../components/SearchPopover'

const AllCategoriesTab = () => {
  const [showModal, setShowModal] = useState(false)
  const [search, setSearch] = useState('')

  return (
    <Paper padding="lg" shadow="xs" className="relative">
      <ResourceList name="categories">
        {({ items, deleteItem, loading, updateItem }) => (
          <>
            <Table highlightOnHover className="relative">
              <LoadingOverlay visible={loading} />
              <thead>
                <tr>
                  <th>Category</th>
                  <th>
                    <SearchPopover value={search} setValue={setSearch} />
                  </th>
                </tr>
              </thead>
              <tbody>
                {items
                  ?.filter((category) =>
                    category.label.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((category) => (
                    <tr key={category._id}>
                      <td>{category.label}</td>
                      <td className="flex">
                        <ActionIcon
                          color="red"
                          radius="lg"
                          className="mr-2"
                          onClick={async (e) => {
                            e.stopPropagation()
                            deleteItem(category._id)
                          }}
                        >
                          <RiDeleteBin5Line className="text-red-400" />
                        </ActionIcon>
                        <ActionIcon
                          radius="lg"
                          color="blue"
                          onClick={(e) => {
                            e.stopPropagation()
                            setShowModal(category)
                          }}
                        >
                          <RiEdit2Line />
                        </ActionIcon>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>

            <EditModal
              handleModal={{ state: showModal, set: setShowModal }}
              updateItem={updateItem}
            />
          </>
        )}
      </ResourceList>
    </Paper>
  )
}

export default AllCategoriesTab
