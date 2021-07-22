import React from 'react'
import Link from 'next/link'
import cx from 'classnames'

const NavItem = ({ item, page, sm }) => (
  <Link href={item.link}>
    <a
      className={cx(
        'flex items-center px-3 py-2 rounded-md text-sm font-medium transition duration-300',
        `text-${sm ? 'sm' : 'base'}`,
        item.label == page
          ? 'bg-gray-900 text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      )}
      aria-current={item.label == page ? 'page' : undefined}
    >
      <span
        className={cx('mr-2', {
          'text-blue-400': item.label == page,
        })}
      >
        {item.icon}
      </span>
      <span>{item.label}</span>
    </a>
  </Link>
)

export default NavItem
