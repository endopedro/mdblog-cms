import React from 'react'
import { PasswordInput } from '@mantine/core'
import { useFormContext } from 'react-hook-form'
import slugify from 'slugify'
import { capitalize } from 'lodash'

const InputPassword = ({ name, slugField, ...rest }) => {
  const methods = useFormContext()

  methods.register(name)
  const watchField = methods.watch(name, '')

  return (
    <PasswordInput
      radius="md"
      label={capitalize(name)}
      defaultValue={methods.getValues(name)}
      onChange={(e) => {
        if (slugField)
          methods.setValue(
            name,
            slugify(e.target.value, { lower: true, strict: true })
          )
        else methods.setValue(name, e.target.value)
      }}
      description={slugField ? watchField : null}
      {...rest}
    />
  )
}

export default InputPassword
