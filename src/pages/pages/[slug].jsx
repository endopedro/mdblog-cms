import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Layout from '../../components/admin/Layout'
import Form from '../../domain/pages/Form'
import { EditResource } from '../../components/admin/Resource'

import pageApi from '../../services/pageApi'

const updatePage = () => {
  const router = useRouter()
  const { slug } = router.query
  const [page, setPage] = useState(null)

  useEffect(async () => {
    if (slug) {
      pageApi()
        .getPage(slug)
        .then(({ data }) => setPage(data.result))
        .catch(() => null)
    }
  }, [router.query])

  return (
    <Layout page="Pages">
      <EditResource
        Form={Form}
        name="pages"
        content={page}
        title="Edit Page"
        callback={() => router.push('/admin/pages')}
      />
    </Layout>
  )
}

export default updatePage
