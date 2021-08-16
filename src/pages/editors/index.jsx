import React, { useState } from 'react'
import { Tabs, Tab } from '@mantine/core'

import Layout from '../../components/admin/Layout'
import AllEditorsTab from '../../domain/editors/tabs/AllEditors'
import NewEditorTab from '../../domain/editors/tabs/NewEditor'

const editors = () => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <Layout page="Editors">
      <Tabs active={activeTab} onTabChange={setActiveTab}>
        <Tab label="All">
          <AllEditorsTab />
        </Tab>
        <Tab label="New">
          <NewEditorTab setActiveTab={setActiveTab} />
        </Tab>
      </Tabs>
    </Layout>
  )
}

export default editors
