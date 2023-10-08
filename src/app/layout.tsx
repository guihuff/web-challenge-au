import './globals.css'
import 'react-toastify/dist/ReactToastify.css';


import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ToastContainer } from 'react-toastify';


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
        <Footer />
        <ToastContainer />
      </body>
    </html>
  )
}
