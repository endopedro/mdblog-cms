import React from 'react'
import { PasswordInput } from '@mantine/core'
import { useFormContext } from 'react-hook-form'
import { capitalize } from 'lodash'

const InputPassword = ({ name, ...rest }) => {
  const methods = useFormContext()
  methods.register(name)

  return (
    <PasswordInput
      radius="md"
      label={capitalize(name)}
      defaultValue={methods.getValues(name)}
      onChange={(e) => methods.setValue(name, e.target.value)}
      error={methods.formState.errors?.[name]?.message}
      {...rest}
    />
  )
}

export default InputPassword
