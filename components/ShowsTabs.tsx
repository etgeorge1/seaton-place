'use client'

import { useState } from 'react'
import BackHome from './BackHome'
import ShowCard from './ShowCard'
import type { Show } from '../lib/shows'

type Tab = 'upcoming' | 'past'

export default function ShowsTabs({
  upcomingShows,
  pastShows,
}: {
  upcomingShows: Show[]
  pastShows: Show[]
}) {
  const [tab, setTab] = useState<Tab>('upcoming')
  const visibleShows = tab === 'upcoming' ? upcomingShows : pastShows

  return (
    <>
      <div className="mb-16">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-8 md:gap-16">
            <BackHome />
            <button
              onClick={() => setTab('upcoming')}
              className={`text-5xl md:text-7xl font-bold font-mono transition-colors ${
                tab === 'upcoming'
                  ? 'text-orange-accent-500'
                  : 'text-gray-900 hover:text-gray-500'
              }`}
            >
              UPCOMING
            </button>
          </div>
          <button
            onClick={() => setTab('past')}
            className={`text-5xl md:text-7xl font-bold font-mono text-right transition-colors ${
              tab === 'past'
                ? 'text-orange-accent-500'
                : 'text-gray-900 hover:text-gray-500'
            }`}
          >
            PAST
          </button>
        </div>
      </div>

      {visibleShows.length > 0 ? (
        visibleShows.map((show) => (
          <ShowCard key={show.isoDate} show={show} showTickets={tab === 'upcoming'} reverse={tab === 'past'} />
        ))
      ) : (
        <p className="text-gray-500 mb-16">
          {tab === 'upcoming' ? 'No upcoming shows yet — check back soon!' : 'No past shows to display.'}
        </p>
      )}
    </>
  )
}
