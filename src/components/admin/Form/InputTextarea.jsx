import React from 'react'
import { Textarea } from '@mantine/core'
import { useFormContext } from 'react-hook-form'
import { capitalize } from 'lodash'

const InputTextarea = ({ name, ...rest }) => {
  const methods = useFormContext()
  methods.register(name)

  return (
    <Textarea
      radius="md"
      label={capitalize(name)}
      defaultValue={methods.getValues(name)}
      onChange={(e) => methods.setValue(name, e.target.value)}
      error={methods.formState.errors?.[name]?.message}
      {...rest}
    />
  )
}

export default InputTextarea
