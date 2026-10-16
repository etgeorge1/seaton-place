'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { photoLoader, type GalleryPage, type GalleryPhoto } from '../lib/gallery'
import Lightbox from './Lightbox'

type Props = {
  initialPhotos: GalleryPhoto[]
  initialNextOffset: number | null
}

export default function PhotoGallery({ initialPhotos, initialNextOffset }: Props) {
  const [photos, setPhotos] = useState(initialPhotos)
  const [nextOffset, setNextOffset] = useState(initialNextOffset)
  const [loadingMore, setLoadingMore] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const loadMore = useCallback(async () => {
    if (nextOffset === null || loadingMore) return
    setLoadingMore(true)
    try {
      const res = await fetch(`/api/gallery?offset=${nextOffset}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const page: GalleryPage = await res.json()
      setPhotos((prev) => [...prev, ...page.items])
      setNextOffset(page.nextOffset)
    } catch {
      // user can retry by scrolling again
    } finally {
      setLoadingMore(false)
    }
  }, [nextOffset, loadingMore])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || nextOffset === null) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore()
      },
      { rootMargin: '800px' },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [nextOffset, loadMore])

  // Keep paging while browsing in the lightbox so "next" doesn't dead-end
  useEffect(() => {
    if (openIndex !== null && openIndex >= photos.length - 3) loadMore()
  }, [openIndex, photos.length, loadMore])

  return (
    <>
      {/* Justified rows: items grow by aspect ratio so each row shares a height, no JS layout needed */}
      <div className="flex flex-wrap gap-2 [--row-h:140px] md:[--row-h:260px]">
        {photos.map((photo, i) => {
          const ratio = photo.width / photo.height
          return (
            <button
              key={photo.id}
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`Open photo ${i + 1}`}
              className="group relative overflow-hidden bg-soft-blush-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-accent-500"
              style={{ flexGrow: ratio * 100, flexBasis: `calc(var(--row-h) * ${ratio})` }}
            >
              <span className="block" style={{ paddingBottom: `${100 / ratio}%` }} />
              <Image
                loader={photoLoader}
                src={photo.src}
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                placeholder="blur"
                blurDataURL={photo.blurDataURL}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          )
        })}
        {/* Absorbs leftover space so the last row isn't stretched */}
        <div aria-hidden style={{ flexGrow: 1e9 }} />
      </div>

      {nextOffset !== null && <div ref={sentinelRef} className="h-1" />}

      {loadingMore && <div className="py-8 text-center text-gray-500">Loading more photos…</div>}

      <Lightbox photos={photos} index={openIndex} onIndexChange={setOpenIndex} />
    </>
  )
}
