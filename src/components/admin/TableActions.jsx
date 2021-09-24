import React from 'react'
import { ActionIcon } from '@mantine/core'
import { RiDeleteBin5Line, RiEyeLine, RiEdit2Line } from 'react-icons/ri'

const TableActions = ({ onDelete, onEdit, onWatch }) => (
  <>
    {onDelete && (
      <ActionIcon
        color="red"
        radius="lg"
        className="inline-block md:mr-2"
        onClick={async (e) => {
          e.stopPropagation()
          onDelete()
        }}
      >
        <RiDeleteBin5Line className="text-red-400 mx-auto" />
      </ActionIcon>
    )}
    {onEdit && (
      <ActionIcon
        radius="lg"
        color="blue"
        className="inline-block"
        onClick={(e) => {
          e.stopPropagation()
          onEdit()
        }}
      >
        <RiEdit2Line className="mx-auto" />
      </ActionIcon>
    )}
    {onWatch && process.env.BLOG_URL && (
      <ActionIcon
        radius="lg"
        color="blue"
        onClick={(e) => {
          e.stopPropagation()
          window.open(`${process.env.BLOG_URL}/post/${onWatch}`, '_blank')
        }}
        className="inline-block"
      >
        <RiEyeLine className="mx-auto" />
      </ActionIcon>
    )}
  </>
)

export default TableActions
