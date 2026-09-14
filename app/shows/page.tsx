'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MdEmail } from 'react-icons/md'
import BackHome from '../../components/BackHome'
import ShowCard from '../../components/ShowCard'

const TICKETS_URL = 'https://www.eventim.us/event/Chay-ViciousVeronas-CourtDisaster-ClubSeaton-Place/699574'

const shows = [
  {
    date: 'Thursday, September 10, 2026',
    isoDate: '2026-09-10',
    venue: 'Public Bar Live',
    ticketUrl: TICKETS_URL,
    imageUrl: '/images/PublicBar.png',
  },
  {
    date: 'Friday, October 23, 2026',
    isoDate: '2026-10-23',
    venue: 'The Artemis',
    ticketUrl: 'https://theartemisdc.com/events/1486/',
    imageUrl: '/images/Artemis%201023.png',
  },
]

type Tab = 'upcoming' | 'past'

export default function ShowsPage() {
  const [tab, setTab] = useState<Tab>('upcoming')

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const upcomingShows = shows.filter((show) => new Date(show.isoDate) >= today)
  const pastShows = shows.filter((show) => new Date(show.isoDate) < today)

  const visibleShows = tab === 'upcoming' ? upcomingShows : pastShows

  return (
    <div className="min-h-screen pt-8 pb-24 px-6 bg-soft-blush-50 text-gray-900">
      <div className="max-w-5xl mx-auto">
        <BackHome />
        <div className="mb-16">
          <div className="flex flex-wrap justify-between gap-16">
            <button
              onClick={() => setTab('upcoming')}
              className={`text-5xl md:text-7xl font-bold font-mono transition-colors ${
                tab === 'upcoming'
                  ? 'text-orange-accent-500'
                  : 'text-gray-900 hover:text-gray-500'
              }`}
            >
              UPCOMING SHOWS
            </button>
            <button
              onClick={() => setTab('past')}
              className={`text-5xl md:text-7xl font-bold font-mono transition-colors ${
                tab === 'past'
                  ? 'text-orange-accent-500'
                  : 'text-gray-900 hover:text-gray-500'
              }`}
            >
              PAST SHOWS
            </button>
          </div>
        </div>

        {visibleShows.length > 0 ? (
          visibleShows.map((show) => (
            <ShowCard key={show.venue} {...show} showTickets={tab === 'upcoming'} reverse={tab === 'past'} />
          ))
        ) : (
          <p className="text-gray-500 mb-16">
            {tab === 'upcoming' ? 'No upcoming shows yet — check back soon!' : 'No past shows to display.'}
          </p>
        )}

        <div className="mt-20 flex justify-center">
          <Link
            href="/contact"
            className="flex items-center gap-4 text-gray-900 hover:text-gray-500 transition-colors"
          >
            <MdEmail size={56} />
            <span className="font-mono font-bold text-3xl md:text-4xl tracking-wider">GET IN TOUCH</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
