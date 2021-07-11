import React from 'react'

import { NewResource } from '../../../components/admin/Resource'
import Form from '../Form'

const NewPage = ({ setActiveTab }) => (
  <NewResource Form={Form} callback={() => setActiveTab(0)} name="pages" />
)

export default NewPage
