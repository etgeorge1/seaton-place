import Image from 'next/image'

interface ShowCardProps {
  date: string
  venue: string
  ticketUrl: string
  imageUrl: string
}

export default function ShowCard({ date, venue, ticketUrl, imageUrl }: ShowCardProps) {
  return (
    <div className="mb-16 border border-pink-orchid-300 p-8 bg-soft-blush-100/50 backdrop-blur-sm">
      <p className="text-sm uppercase tracking-widest text-gray-500 mb-2">
        {date}
      </p>
      <h2 className="text-2xl md:text-3xl font-bold font-mono mb-6">
        {venue}
      </h2>

      <Image
        src={imageUrl}
        alt={`${venue} show flyer`}
        width={540}
        height={675}
        className="w-full max-w-[540px] h-auto block mx-auto"
      />

      <div className="flex items-center justify-center gap-4 mt-6">
        <a
          href={ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          GET TICKETS
        </a>
      </div>
    </div>
  )
}

