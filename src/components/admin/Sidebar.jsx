import React from 'react'
import Link from 'next/link'
import {
  RiDashboard2Line,
  RiDraftLine,
  RiPagesLine,
  RiTeamLine,
  RiUserLine,
  RiShutDownLine,
  RiFileMarkLine,
} from 'react-icons/ri'
import { signOut } from 'next-auth/client'
import cx from 'classnames'

const Sidebar = ({ page }) => {
  const items = [
    {
      label: 'Dashboard',
      icon: <RiDashboard2Line size="1.5rem" />,
    },
    {
      title: 'Administration',
    },
    {
      label: 'Posts',
      icon: <RiDraftLine size="1.5rem" />,
      link: '/admin/posts',
    },
    {
      label: 'Pages',
      icon: <RiPagesLine size="1.5rem" />,
      link: '/admin/pages',
    },
    {
      label: 'Categories',
      icon: <RiFileMarkLine size="1.5rem" />,
      link: '/admin/categories',
    },
    {
      label: 'Editors',
      icon: <RiTeamLine size="1.5rem" />,
      link: '/admin/editors',
    },
    {
      title: 'Account',
    },
    {
      label: 'Profile',
      icon: <RiUserLine size="1.5rem" />,
      link: '/admin/profile',
    },
    {
      label: 'Logout',
      icon: <RiShutDownLine size="1.5rem" className="text-red-400" />,
      action: signOut,
    },
  ]

  const MenuItem = ({ label, icon, link, action, title }) => (
    <li className="my-px">
      {link && (
        <Link href={link}>
          <a
            className={cx(
              'flex flex-row items-center h-12 px-4 rounded-lg text-gray-500 hover:bg-gray-700 transition duration-300',
              { 'bg-gray-700': label == page }
            )}
          >
            <span className={cx({ 'text-blue-400': label == page })}>
              {icon}
            </span>
            <span className={cx('ml-3', { 'text-blue-400': label == page })}>
              {label}
            </span>
          </a>
        </Link>
      )}
      {title && (
        <span className="flex font-medium text-sm text-gray-400 px-4 my-4 uppercase">
          {title}
        </span>
      )}
      {action && (
        <button
          onClick={action}
          className="flex flex-row items-center h-12 px-4 w-full rounded-lg text-gray-500 hover:bg-gray-700"
        >
          <span>{icon}</span>
          <span className="ml-3">{label}</span>
        </button>
      )}
    </li>
  )

  return (
    <div
      className="flex w-full p-4 rounded-lg"
      style={{ backgroundColor: '#1D1E30' }}
    >
      <ul className="flex flex-col w-full">
        {items.map((item, i) => (
          <MenuItem key={i} {...item} />
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
