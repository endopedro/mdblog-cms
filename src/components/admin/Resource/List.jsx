import React, { useState, useEffect } from 'react'
import { useNotifications } from '@mantine/notifications'
import { RiCloseLine, RiCheckLine } from 'react-icons/ri'
import { Loader } from '@mantine/core'
import InfiniteScroll from 'react-infinite-scroller'

import api from '../../../services/api'

const ResourceList = ({ children, name }) => {
  const [items, setItems] = useState(null)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
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

  const fetchResource = async (page) => {
    await api
      .get(name, { params: { page: page } })
      .then(({ data }) => {
        setTotalItems(data.total)
        setTotalPages(data.pages)
        setItems((prevState) =>
          items ? [...prevState, ...data.result] : data.result
        )
      })
      .catch(({ response }) => notify(false, response.data.message))
  }

  useEffect(async () => {
    setLoading(true)
    await fetchResource(1)
    setLoading(false)
  }, [])

  return (
    <>
      {items ? (
        <InfiniteScroll
          pageStart={1}
          loadMore={async (page) => {
            if (page <= totalPages) await fetchResource(page)
          }}
          hasMore={items.length < totalItems}
          loader={<h4>Loading...</h4>}
        >
          {children({
            items,
            setItems,
            fetchResource,
            loading,
            setLoading,
            notify,
            deleteItem,
          })}
        </InfiniteScroll>
      ) : (
        <Loader className="mx-auto" />
      )}
    </>
  )
}

export default ResourceList
