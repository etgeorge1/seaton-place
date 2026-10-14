import Link from 'next/link'
import { MdEmail } from 'react-icons/md'
import ShowsTabs from '../../components/ShowsTabs'
import { SHOWS, isUpcoming } from '../../lib/shows'

// Re-render hourly so the upcoming/past split tracks the current date
export const revalidate = 3600

export default function ShowsPage() {
  const now = new Date()
  const upcomingShows = SHOWS.filter((show) => isUpcoming(show, now))
  const pastShows = SHOWS.filter((show) => !isUpcoming(show, now))

  return (
    <div className="min-h-screen pt-8 pb-24 px-6 bg-soft-blush-50 text-gray-900">
      <div className="max-w-5xl mx-auto">
        <ShowsTabs upcomingShows={upcomingShows} pastShows={pastShows} />

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
