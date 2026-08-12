'use client'

import { useEffect, useState } from 'react'

const TICKETS_URL = 'https://www.eventim.us/event/Chay-ViciousVeronas-CourtDisaster-ClubSeaton-Place/699574'
const FLYER_URL = '/images/PublicBar.png'

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
        className="relative bg-white max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-black/60 text-white hover:bg-black transition-colors font-mono text-lg leading-none"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Flyer image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={FLYER_URL}
          alt="Upcoming show flyer"
          className="w-full h-auto block"
        />

        {/* CTA */}
        <div className="p-6 text-center bg-soft-blush-50">
          <a
            href={TICKETS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            GET TICKETS
          </a>
        </div>
      </div>
    </div>
  )
}
