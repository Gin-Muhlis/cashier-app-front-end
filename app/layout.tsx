import MainLayout from '@/components/MainLayout'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cashier Cafe App',
  description: 'Halaman Cashier',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" data-theme="winter">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
