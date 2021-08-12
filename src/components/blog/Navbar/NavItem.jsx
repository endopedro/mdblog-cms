import React from 'react'
import Link from 'next/link'
import cx from 'classnames'

const NavItem = ({ item, page, sm }) => {
  return (
    <Link href={item.link}>
      <a
        className={cx(
          'flex items-center px-3 py-2 rounded-md font-medium transition duration-300',
          `text-${sm ? 'sm' : 'base'}`,
          item.label == page ? 'text-blue-300' : 'hover:text-blue-400'
        )}
        aria-current={item.label == page ? 'page' : undefined}
      >
        {item.label}
      </a>
    </Link>
  )
}

export default NavItem
