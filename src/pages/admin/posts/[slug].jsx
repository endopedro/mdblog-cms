import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Layout from '../../../components/admin/Layout'
import Form from '../../../domain/posts/Form'
import { EditResource } from '../../../components/admin/Resource'

import postApi from '../../../services/postApi'

const updatePost = () => {
  const router = useRouter()
  const { slug } = router.query
  const [post, setPost] = useState(null)

  useEffect(async () => {
    if (slug) {
      postApi()
        .getPost(slug)
        .then(({ data }) => setPost(data.result))
        .catch(() => null)
    }
  }, [router.query])

  return (
    <Layout page="Posts">
      <EditResource
        Form={Form}
        name="posts"
        content={post}
        title="Edit Post"
        callback={() => router.push('/admin/posts')}
      />
    </Layout>
  )
}

export default updatePost
