import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Header } from '@/components/header'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AU Menu',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={montserrat.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
