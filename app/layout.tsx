import type { Metadata } from 'next'
import { Jost } from 'next/font/google'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import GigPopup from '../components/GigPopup'

const roadgeekMono = localFont({
  src: './fonts/Roadgeek2005Engschrift.ttf',
  variable: '--font-mono',
})

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Seaton Place',
  description: 'Seaton Place - Official website - Tour dates, videos, and more',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${roadgeekMono.variable} ${jost.variable}`}>
        <GigPopup />
        <main>
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  )
}
