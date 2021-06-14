import React from 'react'
import Form from '../Form'

const NewPost = () => {
  const onSubmit = (data) => console.log(data)

  return <Form onSubmit={onSubmit} />
}

export default NewPost
