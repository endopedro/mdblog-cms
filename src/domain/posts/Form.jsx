import React from 'react'
import { TextInput, Select, Badge, Button } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import slugify from 'slugify'
import { data } from '../../states/categories'
import MdInput from '../../components/MdInput'

const schema = yup.object().shape({
  title: yup.string().required('Enter a title').min(3, 'Type at least 3 chars'),
  slug: yup.string().required('Enter a slug').min(3, 'Type at least 3 chars'),
  category: yup.string().required('Pick a category'),
})

const PostForm = ({ onSubmit, loading, post }) => {
  const categories = data.use()

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), defaultValues: post })

  register('content')
  register('tags')
  register('slug')
  const watchTags = watch('tags', post ? post.tags : [])
  const watchSlug = watch('slug', post ? post.slug : '')
  const watchCategory = watch('category')
  const watchContent = watch('content')

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
        defaultValue={getValues('title')}
        onChange={(e) => setValue('title', e.target.value)}
      />
      <TextInput
        label="Slug"
        radius="md"
        required
        className="mb-3"
        onChange={(e) =>
          setValue(
            'slug',
            slugify(e.target.value, { lower: true, strict: true })
          )
        }
        description={watchSlug}
        error={errors.slug?.message}
        disabled={loading}
        name="slug"
        defaultValue={getValues('slug')}
      />
      <div className="grid grid-cols-2 gap-4 mb-7">
        <div>
          <Select
            data={categories?.map((cat) => ({
              value: cat._id,
              label: cat.label,
            }))}
            placeholder="Pick one"
            label="Category"
            radius="md"
            required
            error={errors.category?.message}
            disabled={loading || !categories.length}
            {...register('category')}
            value={watchCategory}
            onChange={(e) => setValue('category', e.target.value)}
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
      <Button
        type="submit"
        variant="light"
        radius="md"
        fullWidth
        disabled={loading}
      >
        {post ? 'Update' : 'Create'} Post
      </Button>
    </form>
  )
}

export default PostForm
