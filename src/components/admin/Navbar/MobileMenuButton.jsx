import React from 'react'
import { Disclosure } from '@headlessui/react'
import { Burger } from '@mantine/core'

const MobileMenuButton = ({ open }) => (
  <Disclosure.Button
    as={'div'}
    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
  >
    <span className="sr-only">Open main menu</span>
    <Burger opened={open} aria-hidden="true" />
  </Disclosure.Button>
)

export default MobileMenuButton
