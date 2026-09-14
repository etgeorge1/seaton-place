'use client'

import { useEffect, useState } from 'react'
import { FaTicket } from 'react-icons/fa6'

const TICKETS_URL = 'https://theartemisdc.com/events/1486/'
const FLYER_URL = '/images/Artemis%201023.png'

export default function GigPopup() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!sessionStorage.getItem('gig-popup-shown')) {
      setVisible(true)
      sessionStorage.setItem('gig-popup-shown', '1')
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={() => setVisible(false)}
    >
      <div
        className="relative max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setVisible(false)}
          className="absolute -top-2 -right-2 md:top-3 md:right-3 z-10 text-gray-900 hover:text-gray-500 transition-colors font-mono text-3xl leading-none"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Flyer image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={FLYER_URL}
          alt="Artemis show flyer"
          className="w-full h-auto block"
        />

        {/* CTA */}
        <div className="p-6 text-center">
          <a
            href={TICKETS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-4 text-orange-accent-500 hover:text-orange-accent-400 transition-colors"
          >
            <FaTicket size={40} className="flex-shrink-0" />
            <span className="font-mono font-bold text-3xl md:text-4xl tracking-wider">GET TICKETS</span>
          </a>
        </div>
      </div>
    </div>
  )
}
