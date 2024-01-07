import { Icon } from '@iconify/react';

import { SideNavItem } from './types';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Dashboard',
    path: '/home',
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: 'Data',
    path: '/data',
    icon: <Icon icon="lucide:folder" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Kategori', path: '/data/category' },
      { title: 'Jenis', path: '/data/type' },
      { title: 'Menu', path: '/data/menu' },
      { title: 'Stok', path: '/data/stock' },
      { title: 'Pelanggan', path: '/data/customer' },
      { title: 'Meja', path: '/data/table' },
    ],
  },
  {
    title: 'User',
    path: '/users',
    icon: <Icon icon="lucide:user" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'User', path: '/users/user' },
      { title: 'Role', path: '/users/role' },
    ],
  },
  {
    title: 'App',
    path: '/applications',
    icon: <Icon icon="lucide:baggage-claim" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Pemesanan', path: '/aplications/order' },
      { title: 'Transaksi', path: '/aplications/transaction' },
      
    ],
  },
  {
    title: 'Laporan',
    path: '/reports',
    icon: <Icon icon="lucide:file" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Laporan Stok', path: '/data/category' },
      { title: 'Laporan Transaksi', path: '/data/type' },
    ],
  },
  
];
