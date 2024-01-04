import { Icon } from '@iconify/react';

import { SideNavItem } from './types';

export const SIDENAV_ITEMS: SideNavItem[] = [
  // {
  //   title: 'Home',
  //   path: '/home',
  //   icon: <Icon icon="lucide:home" width="24" height="24" />,
  // },
  // {
  //   title: 'Kategori',
  //   path: '/category',
  //   icon: <Icon icon="lucide:file" width="24" height="24" />,
  // },
  // {
  //   title: 'Jenis',
  //   path: '/type',
  //   icon: <Icon icon="lucide:book" width="24" height="24" />,
  // },
  // {
  //   title: 'Pelanggan',
  //   path: '/customer',
  //   icon: <Icon icon="lucide:user" width="24" height="24" />,
  // },
  // {
  //   title: 'Meja',
  //   path: '/table',
  //   icon: <Icon icon="lucide:table" width="24" height="24" />,
  // },
  // {
  //   title: 'Menu',
  //   path: '/menu',
  //   icon: <Icon icon="lucide:folder" width="24" height="24" />,
  // },
  // {
  //   title: 'Stok',
  //   path: '/stock',
  //   icon: <Icon icon="lucide:box" width="24" height="24" />,
  // },
  // {
  //   title: 'User',
  //   path: '/user',
  //   icon: <Icon icon="lucide:user" width="24" height="24" />,
  // },
  // {
  //   title: 'Transaksi',
  //   path: '/transaction',
  //   icon: <Icon icon="lucide:baggage-claim" width="24" height="24" />,
  // },
  {
    title: 'Data',
    path: '/data',
    icon: <Icon icon="lucide:folder" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Kategori', path: '/data/category' },
      { title: 'Jenis', path: '/data/type' },
      { title: 'Menu', path: '/data/menu' },
      { title: 'Pelanggan', path: '/data/customer' },
      { title: 'Meja', path: '/data/table' },
      { title: 'Stok', path: '/data/stock' },
    ],
  },
];
