'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { Video } from '../lib/youtube'

type Props = {
  initialVideos: Video[]
  initialNextPageToken: string | null
}

export default function VideoGrid({ initialVideos, initialNextPageToken }: Props) {
  const [videos, setVideos] = useState<Video[]>(initialVideos)
  const [nextPageToken, setNextPageToken] = useState<string | null>(initialNextPageToken)
  const [loadingMore, setLoadingMore] = useState(false)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const loadMore = useCallback(async () => {
    if (!nextPageToken || loadingMore) return
    setLoadingMore(true)
    try {
      const params = new URLSearchParams({ pageToken: nextPageToken })
      const res = await fetch(`/api/youtube-videos?${params}`)
      const data = await res.json()
      setVideos((prev) => [...prev, ...data.items])
      setNextPageToken(data.nextPageToken || null)
    } catch (e) {
      // user can retry by scrolling again
    } finally {
      setLoadingMore(false)
    }
  }, [nextPageToken, loadingMore])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || !nextPageToken) return

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) loadMore()
    })
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [nextPageToken, loadMore])

  return (
    <>
      <div className="grid md:grid-cols-2 gap-8">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className="group animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative aspect-video bg-soft-blush-100 border border-pink-orchid-300 overflow-hidden mb-4 group-hover:border-orange-accent-500 transition-all">
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">{video.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {nextPageToken && <div ref={sentinelRef} className="h-1" />}

      {loadingMore && (
        <div className="text-center py-8 text-gray-500">Loading more videos…</div>
      )}
    </>
  )
}
