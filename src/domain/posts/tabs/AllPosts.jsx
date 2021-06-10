import React from 'react'
import { Paper, Text, Table } from '@mantine/core'
import { RiDeleteBin5Line, RiEyeLine } from 'react-icons/ri'

import formatDate from '../../../utils/formatDate'

const AllPostsTab = () => {
  const posts = [
    {
      id: 1,
      name: 'Name',
      author: 'Author',
      date: '2021-06-09'
    },
    {
      id: 2,
      name: 'Name',
      author: 'Author',
      date: '2021-06-09'
    },
    {
      id: 3,
      name: 'Name',
      author: 'Author',
      date: '2021-06-09'
    }
  ]
  
  return (
    <Paper padding="lg" shadow="xs">
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.name}</td>
              <td>{post.author}</td>
              <td>{formatDate(post.date)}</td>
              <td>
                <div className="flex">
                  <RiDeleteBin5Line className="text-red-400 mr-2" />
                  <RiEyeLine className="text-blue-500" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Paper>
  )
}

export default AllPostsTab
