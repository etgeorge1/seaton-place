import { FaInstagram } from 'react-icons/fa6'

interface ShowCardProps {
  date: string
  venue: string
  ticketUrl: string
  instagramUrl?: string
}

export default function ShowCard({ date, venue, ticketUrl, instagramUrl }: ShowCardProps) {
  return (
    <div className="mb-16 border border-pink-orchid-300 p-8 bg-soft-blush-100/50 backdrop-blur-sm">
      <p className="text-sm uppercase tracking-widest text-gray-500 mb-2">
        {date}
      </p>
      <h2 className="text-2xl md:text-3xl font-bold font-mono mb-4">
        {venue}
      </h2>
      <div className="flex items-center gap-4">
        <a
          href={ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          GET TICKETS
        </a>
        {instagramUrl && (
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View post on Instagram"
            className="text-gray-700 hover:text-pink-orchid-500 transition-colors"
          >
            <FaInstagram size={28} />
          </a>
        )}
      </div>
    </div>
  )
}
