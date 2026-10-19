import Image from 'next/image'
import type { Show } from '../lib/shows'
import TicketInfo from './TicketInfo'

interface ShowCardProps {
  show: Show
  showTickets?: boolean
  reverse?: boolean
}

export default function ShowCard({ show, showTickets = true, reverse = false }: ShowCardProps) {
  const { date, venue, imageUrl } = show
  return (
    <div
      className={`mb-16 py-8 flex flex-col gap-8 items-center ${
        reverse ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={`${venue} show flyer`}
          width={540}
          height={675}
          className="w-full max-w-[400px] h-auto block flex-shrink-0"
        />
      )}

      <div className={`text-center ${reverse ? 'md:text-right' : 'md:text-left'}`}>
        <p className="text-lg md:text-xl uppercase tracking-widest text-gray-500 mb-2">
          {date}
        </p>
        <h2 className="text-4xl md:text-6xl font-bold font-mono mb-6">
          {venue}
        </h2>

        {showTickets && (
          <TicketInfo show={show} className={`justify-center ${reverse ? 'md:justify-end' : 'md:justify-start'}`} />
        )}
      </div>
    </div>
  )
}

