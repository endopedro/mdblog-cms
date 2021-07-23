import React from 'react'
import { Disclosure } from '@headlessui/react'

import { navItems } from './items'
import MobileMenuButton from './MobileMenuButton'
import Logo from './Logo'
import NavItem from './NavItem'
import ProfileDropdown from './ProfileDropdown'

const Navbar = ({ page }) => (
  <Disclosure as="nav" style={{ backgroundColor: '#1D1E30' }}>
    {({ open }) => (
      <>
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mb-3">
          <div className="relative flex items-center justify-between h-14">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <MobileMenuButton open={open} />
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <Logo />
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  {navItems.map((item) => (
                    <NavItem item={item} page={page} sm key={item.label} />
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <ProfileDropdown page={page} />
            </div>
          </div>
        </div>

        <Disclosure.Panel className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <NavItem item={item} page={page} key={item.label} />
            ))}
          </div>
        </Disclosure.Panel>
      </>
    )}
  </Disclosure>
)

export default Navbar
