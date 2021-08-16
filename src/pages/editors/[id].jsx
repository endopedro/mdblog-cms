import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Layout from '../../components/admin/Layout'
import Form from '../../domain/editors/Form'
import { EditResource } from '../../components/admin/Resource'

import userApi from '../../services/userApi'

const updatePost = () => {
  const router = useRouter()
  const { id } = router.query
  const [user, setEditor] = useState(null)

  useEffect(async () => {
    if (id) {
      userApi()
        .getUser(id)
        .then(({ data }) => setEditor(data.result))
        .catch(() => null)
    }
  }, [router.query])

  return (
    <Layout page="Editors">
      <EditResource
        Form={Form}
        name="users"
        content={user}
        title="Edit Editor"
        callback={() => router.push('/admin/editors')}
      />
    </Layout>
  )
}

export default updatePost
