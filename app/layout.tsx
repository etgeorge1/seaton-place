import type { Metadata } from 'next'
import { Space_Mono, Outfit } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

const spaceMono = Space_Mono({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono'
})

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-sans'
})

export const metadata: Metadata = {
  title: 'The Band Name',
  description: 'Official website - Tour dates, videos, and more',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${spaceMono.variable} ${outfit.variable}`}>
        <Navigation />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
