'use client'

import Link from 'next/link'
import BackHome from '../../components/BackHome'
import ShowCard from '../../components/ShowCard'

const TICKETS_URL = 'https://www.eventim.us/event/Chay-ViciousVeronas-CourtDisaster-ClubSeaton-Place/699574'

const shows = [
  {
    date: 'Thursday, September 10, 2026',
    venue: 'Public Bar Live',
    ticketUrl: TICKETS_URL,
    instagramUrl: 'https://www.instagram.com/p/DbB84lNGKXR/',
  },
  {
    date: 'Friday, October 23, 2026',
    venue: 'The Artemis',
    ticketUrl: 'https://theartemisdc.com/events/1486/',
  },
]

export default function ShowsPage() {
  return (
    <div className="min-h-screen pt-8 pb-24 px-6 bg-soft-blush-50 text-gray-900">
      <div className="max-w-5xl mx-auto">
        <BackHome />
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold font-mono mb-6">
            UPCOMING SHOWS
          </h1>
        </div>

        {shows.map((show) => (
          <ShowCard key={show.venue} {...show} />
        ))}

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
