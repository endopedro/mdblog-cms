import React, { useState, useEffect } from 'react'
import { useNotifications } from '@mantine/notifications'
import { RiCloseLine, RiCheckLine } from 'react-icons/ri'
import { Loader } from '@mantine/core'

import api from '../../../services/api'

const ResourceList = ({ children, name }) => {
  const [items, setItems] = useState(null)
  const [loading, setLoading] = useState(false)
  const notifications = useNotifications()

  const notify = (success, message) => {
    notifications.showNotification({
      title: success ? 'Success' : 'Fail',
      message: message,
      color: success ? 'blue' : 'red',
      icon: success ? <RiCheckLine /> : <RiCloseLine />,
    })
  }

  const deleteItem = async (id) => {
    setLoading(true)
    await api
      .delete(name, { data: { _id: id } })
      .then(({ data }) => {
        setItems((prevState) => [
          ...prevState.filter((item) => item._id != data.result._id),
        ])
        notify(true, 'Item deleted')
      })
      .catch(({ response }) => notify(false, response.data.message))
      .finally(() => setLoading(false))
  }

  const fetchResource = async () => {
    setLoading(true)
    await api
      .get(name)
      .then(({ data }) =>
        setItems((prevState) =>
          items ? [...prevState, ...data.result] : data.result
        )
      )
      .catch(({ response }) => notify(false, response.data.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => fetchResource(), [])

  return (
    <>
      {items ? (
        children({
          items,
          setItems,
          fetchResource,
          loading,
          setLoading,
          notify,
          deleteItem,
        })
      ) : (
        <Loader className="mx-auto" />
      )}
    </>
  )
}

export default ResourceList
