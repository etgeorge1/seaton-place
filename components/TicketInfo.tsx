import { FaTicket } from 'react-icons/fa6'
import type { Show } from '../lib/shows'

const content = 'font-mono font-bold text-3xl md:text-4xl tracking-wider'

export default function TicketInfo({ show, className = '' }: { show: Show; className?: string }) {
  if (show.ticketUrl) {
    return (
      <a
        href={show.ticketUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-4 text-orange-accent-500 hover:text-orange-accent-400 transition-colors ${className}`}
      >
        <FaTicket size={40} className="flex-shrink-0" />
        <span className={content}>GET TICKETS</span>
      </a>
    )
  }

  if (show.doorPrice) {
    return (
      <p className={`flex items-center gap-4 text-orange-accent-500 ${className}`}>
        <FaTicket size={40} className="flex-shrink-0" />
        <span className={content}>{show.doorPrice} AT THE DOOR</span>
      </p>
    )
  }

  if (show.ticketText) {
    return (
      <p className={`flex items-center gap-4 text-orange-accent-500 ${className}`}>
        <FaTicket size={40} className="flex-shrink-0" />
        <span className={content}>{show.ticketText}</span>
      </p>
    )
  }

  return null
}
