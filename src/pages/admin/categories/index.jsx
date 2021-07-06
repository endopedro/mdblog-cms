import React, { useState } from 'react'
import { Tabs, Tab } from '@mantine/core'

import Layout from '../../../components/admin/Layout'
import AllCategoriesTab from '../../../domain/categories/tabs/AllCategories'
import NewCategoryTab from '../../../domain/categories/tabs/NewCategory'

const Categories = () => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <Layout page="Categories">
      <Tabs active={activeTab} onTabChange={setActiveTab}>
        <Tab label="All">
          <AllCategoriesTab />
        </Tab>
        <Tab label="New">
          <NewCategoryTab setActiveTab={setActiveTab} />
        </Tab>
      </Tabs>
    </Layout>
  )
}

export default Categories
