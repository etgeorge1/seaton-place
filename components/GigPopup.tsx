'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { FaTicket } from 'react-icons/fa6'
import { nextShow, type Show } from '../lib/shows'

function storageKey(show: Show) {
  return `gig-popup-dismissed-${show.isoDate}`
}

export default function GigPopup() {
  const [show, setShow] = useState<Show | null>(null)

  const dismiss = useCallback(() => {
    if (show) sessionStorage.setItem(storageKey(show), '1')
    setShow(null)
  }, [show])

  useEffect(() => {
    const upcoming = nextShow()
    if (upcoming && !sessionStorage.getItem(storageKey(upcoming))) {
      setShow(upcoming)
    }
  }, [])

  useEffect(() => {
    if (!show) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [show, dismiss])

  if (!show) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Upcoming show"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={dismiss}
    >
      <div
        className="relative max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={dismiss}
          className="absolute -top-2 -right-2 md:top-3 md:right-3 z-10 text-gray-900 hover:text-gray-500 transition-colors font-mono text-3xl leading-none"
          aria-label="Close"
        >
          ✕
        </button>

        <Image
          src={show.imageUrl}
          alt={`${show.venue} show flyer`}
          width={540}
          height={675}
          priority
          className="w-full h-auto block"
        />

        <div className="p-6 text-center">
          <a
            href={show.ticketUrl}
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
