import React, { useState } from 'react'
import { Tabs, Tab } from '@mantine/core'

import Layout from '../../../components/admin/Layout'
import AllPagesTab from '../../../domain/pages/tabs/AllPages'
import NewPageTab from '../../../domain/pages/tabs/NewPage'

const pages = () => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <Layout>
      <Tabs active={activeTab} onTabChange={setActiveTab}>
        <Tab label="All">
          <AllPagesTab />
        </Tab>
        <Tab label="New">
          <NewPageTab setActiveTab={setActiveTab} />
        </Tab>
      </Tabs>
    </Layout>
  )
}

export default pages
