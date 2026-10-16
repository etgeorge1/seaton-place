'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { FaChevronLeft, FaChevronRight, FaXmark } from 'react-icons/fa6'
import { photoLoader, type GalleryPhoto } from '../lib/gallery'

type Props = {
  photos: GalleryPhoto[]
  index: number | null
  onIndexChange: (index: number | null) => void
}

export default function Lightbox({ photos, index, onIndexChange }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const photo = index === null ? null : photos[index]

  // Native modal dialog gives us focus trapping, Escape-to-close and inert background for free
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (index !== null && !dialog.open) dialog.showModal()
    if (index === null && dialog.open) dialog.close()
  }, [index])

  const go = (delta: number) => {
    if (index === null) return
    const next = index + delta
    if (next >= 0 && next < photos.length) onIndexChange(next)
  }

  const navButton = 'absolute top-1/2 -translate-y-1/2 p-4 text-white/80 hover:text-white disabled:opacity-20 transition-opacity'

  return (
    <dialog
      ref={dialogRef}
      onClose={() => onIndexChange(null)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') go(-1)
        if (e.key === 'ArrowRight') go(1)
      }}
      aria-label="Photo viewer"
      className="m-0 h-screen max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-black/90"
    >
      {photo && (
        <div
          className="relative h-full w-full"
          onClick={(e) => {
            if (e.target === e.currentTarget) onIndexChange(null)
          }}
        >
          <div className="pointer-events-none absolute inset-4 md:inset-16">
            <Image
              key={photo.id}
              loader={photoLoader}
              src={photo.src}
              alt={`Photo ${index! + 1} of ${photos.length}`}
              fill
              sizes="100vw"
              placeholder="blur"
              blurDataURL={photo.blurDataURL}
              className="object-contain"
            />
          </div>

          <button type="button" onClick={() => go(-1)} disabled={index === 0} aria-label="Previous photo" className={`${navButton} left-0`}>
            <FaChevronLeft size={32} />
          </button>
          <button type="button" onClick={() => go(1)} disabled={index === photos.length - 1} aria-label="Next photo" className={`${navButton} right-0`}>
            <FaChevronRight size={32} />
          </button>
          <button
            type="button"
            onClick={() => onIndexChange(null)}
            aria-label="Close"
            autoFocus
            className="absolute right-0 top-0 p-4 text-white/80 hover:text-white"
          >
            <FaXmark size={32} />
          </button>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-sm text-white/70">
            {index! + 1} / {photos.length}
          </p>
        </div>
      )}
    </dialog>
  )
}
