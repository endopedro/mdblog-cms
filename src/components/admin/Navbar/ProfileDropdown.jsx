import React, { Fragment } from 'react'
import Link from 'next/link'
import { Menu, Transition } from '@headlessui/react'
import { Avatar } from '@mantine/core'
import { RiUserLine } from 'react-icons/ri'
import cx from 'classnames'

import { data } from '../../../states/session'
import { accountItems } from './items'

const ProfileDropdown = ({ page }) => {
  const session = data.use()

  return (
    <Menu as="div" className="ml-3 relative z-10">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">Open user menu</span>
              <Avatar
                src={session?.user?.picture?.secure_url}
                alt="user avatar"
                radius="xl"
                style={{ height: '32px', width: '32px' }}
              >
                <RiUserLine />
              </Avatar>
            </Menu.Button>
          </div>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              {accountItems.map((item) => (
                <div key={item.label}>
                  {item.link && (
                    <Menu.Item key={item.label}>
                      {({ active }) => (
                        <Link href={item.link}>
                          <a
                            className={cx(
                              'flex items-center px-4 py-2 text-sm text-white transition duration-300',
                              item.label == page
                                ? 'bg-gray-500'
                                : 'hover:bg-gray-500'
                            )}
                          >
                            <span
                              className={cx('mr-2', {
                                'text-blue-400': item.label == page,
                              })}
                            >
                              {item.icon}
                            </span>
                            <span className="mr-2">{item.label}</span>
                          </a>
                        </Link>
                      )}
                    </Menu.Item>
                  )}
                  {item.action && (
                    <Menu.Item onClick={item.action} key={item.label}>
                      {({ active }) => (
                        <div
                          className={cx(
                            'flex items-center px-4 py-2 text-sm text-white cursor-pointer',
                            { 'bg-gray-500': active }
                          )}
                        >
                          <span
                            className={cx('mr-2', {
                              'text-blue-400': item.label == page,
                            })}
                          >
                            {item.icon}
                          </span>
                          <span className="mr-2">{item.label}</span>
                        </div>
                      )}
                    </Menu.Item>
                  )}
                </div>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}

export default ProfileDropdown
