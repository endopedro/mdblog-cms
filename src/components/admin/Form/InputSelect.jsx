import React from 'react'
import { Select } from '@mantine/core'
import { useFormContext } from 'react-hook-form'
import { capitalize } from 'lodash'

const InputSelect = ({ name, ...rest }) => {
  const methods = useFormContext()
  methods.register(name)

  return (
    <Select
      radius="md"
      label={capitalize(name)}
      value={methods.getValues(name)}
      onChange={(e) => methods.setValue(name, e)}
      error={methods.formState.errors?.[name]?.message}
      {...rest}
    />
  )
}

export default InputSelect
