'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  const links = [
    { href: '/', label: 'Home' },
    { href: '/shows', label: 'Shows' },
    { href: '/videos', label: 'Videos' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-soft-blush-50/80 backdrop-blur-md border-b border-pink-orchid-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-5 flex items-center justify-between gap-2">
        {/* Logo */}
        <Link href="/" className="text-lg sm:text-2xl font-bold font-mono tracking-tight hover:text-orange-accent-500 transition-colors whitespace-nowrap">
          SEATON<span className="text-orange-accent-500">.</span>PLACE
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-2 sm:gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-mono text-xs sm:text-sm tracking-wider transition-all relative group whitespace-nowrap ${
                pathname === link.href
                  ? 'text-orange-accent-500'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-orange-accent-500" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
