import { Icon } from '@iconify/react';

import { SideNavItem } from './types';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Home',
    path: '/',
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: 'Kategori',
    path: '/category',
    icon: <Icon icon="lucide:file" width="24" height="24" />,
  },
  {
    title: 'Jenis',
    path: '/type',
    icon: <Icon icon="lucide:book" width="24" height="24" />,
  },
  {
    title: 'Pelanggan',
    path: '/customer',
    icon: <Icon icon="lucide:user" width="24" height="24" />,
  },
  {
    title: 'Meja',
    path: '/table',
    icon: <Icon icon="lucide:table" width="24" height="24" />,
  },
  {
    title: 'Menu',
    path: '/menu',
    icon: <Icon icon="lucide:folder" width="24" height="24" />,
  },
  {
    title: 'Stok',
    path: '/stock',
    icon: <Icon icon="lucide:box" width="24" height="24" />,
  },
  {
    title: 'User',
    path: '/user',
    icon: <Icon icon="lucide:user" width="24" height="24" />,
  },
  {
    title: 'Transaksi',
    path: '/transaction',
    icon: <Icon icon="lucide:baggage-claim" width="24" height="24" />,
  },


  // {
  //   title: 'Projects',
  //   path: '/projects',
  //   icon: <Icon icon="lucide:folder" width="24" height="24" />,
  //   submenu: true,
  //   subMenuItems: [
  //     { title: 'All', path: '/projects' },
  //     { title: 'Web Design', path: '/projects/web-design' },
  //     { title: 'Graphic Design', path: '/projects/graphic-design' },
  //   ],
  // },
  //   {
  //   title: 'Settings',
  //   path: '/settings',
  //   icon: <Icon icon="lucide:settings" width="24" height="24" />,
  //   submenu: true,
  //   subMenuItems: [
  //     { title: 'Account', path: '/settings/account' },
  //     { title: 'Privacy', path: '/settings/privacy' },
  //   ],
  // },
  // {
  //   title: 'Help',
  //   path: '/help',
  //   icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
  // },
];
