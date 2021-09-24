import React, { useState } from 'react'
import { Paper, Table, ActionIcon, LoadingOverlay } from '@mantine/core'
import { RiDeleteBin5Line, RiEdit2Line } from 'react-icons/ri'

import EditModal from '../EditModal'
import { ResourceList } from '../../../components/admin/Resource'
import SearchPopover from '../../../components/admin/SearchPopover'
import TableActions from '../../../components/admin/TableActions'

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
                      <td className="truncate">
                        <TableActions
                          onDelete={() => deleteItem(category._id)}
                          onEdit={() => setShowModal(category)}
                        />
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
