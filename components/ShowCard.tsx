import Image from 'next/image'
import { FaTicket } from 'react-icons/fa6'

interface ShowCardProps {
  date: string
  venue: string
  ticketUrl: string
  imageUrl: string
  showTickets?: boolean
  reverse?: boolean
}

export default function ShowCard({ date, venue, ticketUrl, imageUrl, showTickets = true, reverse = false }: ShowCardProps) {
  return (
    <div
      className={`mb-16 py-8 flex flex-col gap-8 items-center ${
        reverse ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}
    >
      <Image
        src={imageUrl}
        alt={`${venue} show flyer`}
        width={540}
        height={675}
        className="w-full max-w-[400px] h-auto block flex-shrink-0"
      />

      <div className={`text-center ${reverse ? 'md:text-right' : 'md:text-left'}`}>
        <p className="text-lg md:text-xl uppercase tracking-widest text-gray-500 mb-2">
          {date}
        </p>
        <h2 className="text-4xl md:text-6xl font-bold font-mono mb-6">
          {venue}
        </h2>

        {showTickets && (
          <a
            href={ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-4 justify-center text-orange-accent-500 hover:text-orange-accent-400 transition-colors ${
              reverse ? 'md:justify-end' : 'md:justify-start'
            }`}
          >
            <FaTicket size={40} className="flex-shrink-0" />
            <span className="font-mono font-bold text-3xl md:text-4xl tracking-wider">GET TICKETS</span>
          </a>
        )}
      </div>
    </div>
  )
}

