import { signOut } from 'next-auth/client'
import {
  RiDashboard2Line,
  RiDraftLine,
  RiPagesLine,
  RiTeamLine,
  RiUserLine,
  RiShutDownLine,
  RiFileMarkLine,
  RiSettings5Line,
} from 'react-icons/ri'

const navItems = [
  // {
  //   label: 'Dashboard',
  //   icon: <RiDashboard2Line size="1.25rem" />,
  //   link: '/',
  // },
  {
    label: 'Posts',
    icon: <RiDraftLine size="1.25rem" />,
    link: '/posts',
  },
  {
    label: 'Pages',
    icon: <RiPagesLine size="1.25rem" />,
    link: '/pages',
  },
  {
    label: 'Categories',
    icon: <RiFileMarkLine size="1.25rem" />,
    link: '/categories',
  },
  {
    label: 'Editors',
    icon: <RiTeamLine size="1.25rem" />,
    link: '/editors',
    super: true,
  },
  {
    label: 'Settings',
    icon: <RiSettings5Line size="1.25rem" />,
    link: '/settings',
  },
]

const accountItems = [
  {
    label: 'Profile',
    icon: <RiUserLine />,
    link: '/profile',
  },
  {
    label: 'Logout',
    icon: <RiShutDownLine className="text-red-400" />,
    action: signOut,
  },
]

export { navItems, accountItems }
