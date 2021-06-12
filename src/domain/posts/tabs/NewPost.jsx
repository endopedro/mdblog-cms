import React, { useState } from 'react'
import { TextInput, Select, Badge, Button } from '@mantine/core'
import { useForm } from "react-hook-form"

import MdInput from '../../../components/MdInput'

const NewPost = () => {
  const { register, handleSubmit, setValue, getValues, watch, formState: { errors } } = useForm()

  const onSubmit = data => console.log(data)

  register("content")
  register("tags")
  const watchContent = watch("content", '');
  const watchTags = watch("tags", [])

  const toggleTags = (tag, action) => {
    const cleanTag = tag.toLowerCase().split(" ").filter(x => x)[0]
    if (!cleanTag) return
    const tags = watchTags ? [...watchTags] : []
    const idx = tags.indexOf(cleanTag)

    if (idx !== -1 && action === 'remove') tags.splice(idx, 1)
    else if(idx === -1 && action === 'add') tags.push(cleanTag)
    
    setValue('tags', tags)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        label="Title"
        radius="md"
        required
        className="mb-3"
        {...register("title")}
      />
      <TextInput
        label="Slug"
        radius="md"
        required
        className="mb-3"
        {...register("slug")}
      />
      <div className="grid grid-cols-2 gap-4 mb-7">
        <div>
          <Select
            data={[
              { _id: 'react', label: 'React' },
              { _id: 'vue', label: 'Vue' },
              { _id: 'ng', label: 'Angular' },
              { _id: 'svelte', label: 'Svelte' },
            ]}
            placeholder="Pick one"
            label="Category"
            radius="md"
            required
            {...register("category")}
        />
        </div>
        <div>
          <TextInput
            label="Tags"
            radius="md"
            onKeyPress={e => {
              if (e.key === "Enter") {
                toggleTags(e.target.value, 'add')
                e.preventDefault()
              }
            }}
          />
          <div className="mt-2">
            {watchTags?.map(tag => (
              <Badge variant="outline" className="mr-2 cursor-pointer" onClick={() => toggleTags(tag, 'remove')}>{tag}</Badge>
            ))}
          </div>
        </div>
      </div>
      <MdInput value={watchContent} onChange={val => setValue('content', val)} className="mb-3" />
      <Button type='submit' variant="light" radius="md" fullWidth>Create Post</Button>
    </form>
  )
}

export default NewPost
