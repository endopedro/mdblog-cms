import React, { useState } from 'react'
import { ActionIcon, Popover, Input } from '@mantine/core'
import { RiSearchLine } from 'react-icons/ri'

const SearchPopover = ({ value, setValue }) => {
  const [opened, setOpened] = useState(false)

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      target={
        <ActionIcon onClick={() => setOpened((o) => !o)}>
          <RiSearchLine />
        </ActionIcon>
      }
      position="top"
      withArrow
    >
      <Input
        placeholder="Search..."
        style={{ minWidth: 250 }}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </Popover>
  )
}

export default SearchPopover
