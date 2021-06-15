import React from 'react'
import { TextInput, Select, Badge, Button } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import slugify from 'slugify'

import MdInput from '../../components/MdInput'

const schema = yup.object().shape({
  title: yup.string().required('Enter a title').min(3, 'Type at least 3 chars'),
  slug: yup.string().required('Enter a slug').min(3, 'Type at least 3 chars'),
  category: yup.string().required('Pick a category'),
})

const NewPostForm = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  register('content')
  register('tags')
  register('slug')
  const watchContent = watch('content', '')
  const watchTags = watch('tags', [])
  const watchSlug = watch('slug', '')

  const toggleTags = (tag, action) => {
    const cleanTag = tag
      .toLowerCase()
      .split(' ')
      .filter((x) => x)[0]
    if (!cleanTag) return
    const tags = watchTags ? [...watchTags] : []
    const idx = tags.indexOf(cleanTag)

    if (idx !== -1 && action === 'remove') tags.splice(idx, 1)
    else if (idx === -1 && action === 'add') tags.push(cleanTag)

    setValue('tags', tags)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        label="Title"
        radius="md"
        required
        className="mb-3"
        error={errors.title?.message}
        disabled={loading}
        {...register('title')}
      />
      <TextInput
        label="Slug"
        radius="md"
        required
        className="mb-3"
        onChange={e => setValue('slug' ,slugify(e.target.value, {lower: true, strict: true}))}
        description={watchSlug}
        error={errors.slug?.message}
        disabled={loading}
        name='slug'
      />
      <div className="grid grid-cols-2 gap-4 mb-7">
        <div>
          <Select
            data={[
              { value: '', label: 'Pick one' },
              { value: 'react', label: 'React' },
              { value: 'vue', label: 'Vue' },
              { value: 'ng', label: 'Angular' },
              { value: 'svelte', label: 'Svelte' },
            ]}
            placeholder="Pick one"
            label="Category"
            radius="md"
            required
            error={errors.category?.message}
            disabled={loading}
            {...register('category')}
          />
        </div>
        <div>
          <TextInput
            label="Tags"
            disabled={loading}
            radius="md"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                toggleTags(e.target.value, 'add')
                e.preventDefault()
              }
            }}
          />
          <div className="mt-2">
            {watchTags?.map((tag) => (
              <Badge
                variant="outline"
                className="mr-2 cursor-pointer"
                onClick={() => toggleTags(tag, 'remove')}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <MdInput
        value={watchContent}
        onChange={(val) => setValue('content', val)}
        className="mb-3"
        disabled={loading}
      />
      <Button type="submit" variant="light" radius="md" fullWidth disabled={loading}>
        Create Post
      </Button>
    </form>
  )
}

export default NewPostForm
