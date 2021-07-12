import React from 'react'

import { NewResource } from '../../../components/admin/Resource'
import Form from '../Form'

const NewPost = ({ setActiveTab }) => (
  <NewResource Form={Form} callback={() => setActiveTab(0)} name="users" />
)

export default NewPost
