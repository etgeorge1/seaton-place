'use client'

import { useState } from 'react'
import Link from 'next/link'
import BackHome from '../../components/BackHome'
import InstagramEmbed from '../../components/InstagramEmbed'

export default function ShowsPage() {
  const [embedLoaded, setEmbedLoaded] = useState(false)

  return (
    <div className="min-h-screen pt-8 pb-24 px-6 bg-soft-blush-50 text-gray-900">
      <div className="max-w-5xl mx-auto">
        <BackHome />
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold font-mono mb-6">
            UPCOMING SHOWS
          </h1>
        </div>

        <div className="mb-8">
          <InstagramEmbed
            permalink="https://www.instagram.com/p/Da_JjoGGA02/"
            onLoad={() => setEmbedLoaded(true)}
          />
        </div>

        {embedLoaded && (
          <div className="mb-16 text-center">
            <a
              href="https://www.eventim.us/event/Chay-ViciousVeronas-CourtDisaster-ClubSeaton-Place/699574"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              GET TICKETS
            </a>
          </div>
        )}

        <div className="border border-pink-orchid-300 p-10 bg-soft-blush-100/50 backdrop-blur-sm text-center">
          <p className="text-gray-500 mb-8">
            Want to book us for your venue or event?
          </p>
          <Link
            href="/contact"
            className="btn-primary-sm"
          >
            GET IN TOUCH
          </Link>
        </div>
      </div>
    </div>
  )
}
