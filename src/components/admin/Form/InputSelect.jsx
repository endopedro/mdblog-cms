import React from 'react'
import { Select } from '@mantine/core'
import { useFormContext } from 'react-hook-form'
import { capitalize } from 'lodash'

const InputSelect = ({ name, ...rest }) => {
  const methods = useFormContext()

  methods.register(name)
  const watchField = methods.watch(name, '')

  return (
    <Select
      radius="md"
      error={methods.errors?.category?.message}
      label={capitalize(name)}
      value={watchField}
      onChange={(e) => methods.setValue('category', e)}
      {...rest}
    />
  )
}

export default InputSelect
