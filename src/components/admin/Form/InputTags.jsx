import React, { useEffect } from 'react'
import { TextInput, Badge } from '@mantine/core'
import { useFormContext } from 'react-hook-form'
import { capitalize } from 'lodash'

const InputTags = ({ name, value, ...rest }) => {
  const methods = useFormContext()
  methods.register(name)
  const watchField = methods.watch(name, [])

  const toggleTags = (tag, action) => {
    const cleanTag = tag
      .toLowerCase()
      .split(' ')
      .filter((x) => x)[0]
    if (!cleanTag) return
    const tags = watchField ? [...watchField] : []
    const idx = tags.indexOf(cleanTag)

    if (idx !== -1 && action === 'remove') tags.splice(idx, 1)
    else if (idx === -1 && action === 'add') tags.push(cleanTag)

    methods.setValue(name, tags)
  }

  useEffect(() => methods.setValue(name, value), [])

  return (
    <>
      <TextInput
        label={capitalize(name)}
        radius="md"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            toggleTags(e.target.value, 'add')
            e.preventDefault()
          }
        }}
        {...rest}
      />
      <div className="mt-2">
        {watchField?.map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="mr-2 cursor-pointer"
            onClick={() => toggleTags(tag, 'remove')}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </>
  )
}

export default InputTags
