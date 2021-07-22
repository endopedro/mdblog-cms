import { signOut } from 'next-auth/client'
import {
  RiDashboard2Line,
  RiDraftLine,
  RiPagesLine,
  RiTeamLine,
  RiUserLine,
  RiShutDownLine,
  RiFileMarkLine,
} from 'react-icons/ri'

const navItems = [
  {
    label: 'Dashboard',
    icon: <RiDashboard2Line size="1.25rem" />,
    link: '/admin',
  },
  {
    label: 'Posts',
    icon: <RiDraftLine size="1.25rem" />,
    link: '/admin/posts',
  },
  {
    label: 'Pages',
    icon: <RiPagesLine size="1.25rem" />,
    link: '/admin/pages',
  },
  {
    label: 'Categories',
    icon: <RiFileMarkLine size="1.25rem" />,
    link: '/admin/categories',
  },
  {
    label: 'Editors',
    icon: <RiTeamLine size="1.25rem" />,
    link: '/admin/editors',
  },
]

const accountItems = [
  {
    label: 'Profile',
    icon: <RiUserLine />,
    link: '/admin/profile',
  },
  {
    label: 'Logout',
    icon: <RiShutDownLine className="text-red-400" />,
    action: signOut,
  },
]

export { navItems, accountItems }
