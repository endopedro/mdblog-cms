import React, { useState } from 'react'
import { Tabs, Tab } from '@mantine/core'

import Layout from '../../../components/admin/Layout'
import AllPostsTab from '../../../domain/posts/tabs/AllPosts'
import NewPostTab from '../../../domain/posts/tabs/NewPost'

const posts = () => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <Layout>
      <Tabs active={activeTab} onTabChange={setActiveTab}>
        <Tab label="All">
          <AllPostsTab />
        </Tab>
        <Tab label="New">
          <NewPostTab setActiveTab={setActiveTab} />
        </Tab>
      </Tabs>
    </Layout>
  )
}

export default posts
