import React from 'react'

import { NewResource } from '../../../components/admin/Resource'
import Form from '../Form'

const NewCategory = ({ setActiveTab }) => (
  <NewResource Form={Form} callback={() => setActiveTab(0)} name="categories" />
)

export default NewCategory
