import React, { useState, useEffect } from 'react'
import { RiCloseLine, RiCheckLine } from 'react-icons/ri'
import { useNotifications } from '@mantine/notifications'
import { Title, Divider, LoadingOverlay } from '@mantine/core'
import { useRouter } from 'next/router'

import Layout from '../../../components/admin/Layout'
import Form from '../../../domain/editors/Form'

import { data, editUser, load } from '../../../states/users'

const updateEditor = () => {
  const router = useRouter()
  const { email } = router.query
  const editors = data.use()
  const loading = load.use()
  const notifications = useNotifications()

  const [editor, setEditor] = useState(null)

  const notify = (success = true, message) => {
    notifications.showNotification({
      title: success ? 'Success' : 'Fail',
      message: success ? 'Editor Updated' : 'Something went wrong',
      color: success ? 'blue' : 'red',
      icon: success ? <RiCheckLine /> : <RiCloseLine />,
    })
  }

  useEffect(async () => {
    if (email) {
      const editorToEdit = editors?.find((editor) => editor.email == email)
      if (editorToEdit) setEditor(editorToEdit)
      else notify(false, 'Editor not found.')
    }
  }, [editors])

  const onSubmit = async (data) => {
    const isEditorUpdated = await editUser(data)
    notify(isEditorUpdated)
    if (isEditorUpdated) router.push('/admin/editors')
  }

  return (
    <Layout page="Editors">
      <LoadingOverlay visible={loading} />
      <Title order={3}>Edit Editor</Title>
      <Divider className="mb-5 mt-2" />
      {editor && <Form onSubmit={onSubmit} loading={loading} editor={editor} />}
    </Layout>
  )
}

export default updateEditor
