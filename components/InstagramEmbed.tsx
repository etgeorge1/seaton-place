'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

interface InstagramEmbedProps {
  permalink: string
  onLoad?: () => void
}

export default function InstagramEmbed({ permalink, onLoad }: InstagramEmbedProps) {
  const [loaded, setLoaded] = useState(false)

  // If the script was already loaded on a previous navigation, onLoad won't
  // fire again — detect it here instead.
  useEffect(() => {
    if ((window as any).instgrm) {
      setLoaded(true)
      onLoad?.()
    }
  }, [])

  // Process the blockquote after it's been rendered into the DOM
  useEffect(() => {
    if (loaded && (window as any).instgrm) {
      ;(window as any).instgrm.Embeds.process()
    }
  }, [loaded])

  function handleScriptLoad() {
    setLoaded(true)
    onLoad?.()
  }

  return (
    <div className="flex flex-col items-center w-full">
      {!loaded ? (
        <div className="w-full max-w-[540px] min-w-[326px] animate-pulse">
          {/* Profile row */}
          <div className="bg-white border border-gray-200 p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0" />
            <div className="flex flex-col gap-2 flex-1">
              <div className="h-3 bg-gray-200 rounded w-24" />
              <div className="h-3 bg-gray-200 rounded w-16" />
            </div>
          </div>
          {/* Image block */}
          <div className="w-full aspect-square bg-gray-200" />
          {/* Caption lines */}
          <div className="bg-white border border-t-0 border-gray-200 p-4 flex flex-col gap-2">
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-4/5" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      ) : (
        <blockquote
          className="instagram-media"
          data-instgrm-captioned
          data-instgrm-permalink={`${permalink}?utm_source=ig_embed&utm_campaign=loading`}
          data-instgrm-version="14"
          style={{
            background: '#FFF',
            border: 0,
            borderRadius: '3px',
            boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
            margin: '1px',
            maxWidth: '540px',
            minWidth: '326px',
            padding: 0,
            width: '99.375%',
          }}
        />
      )}

      <Script
        src="//www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={handleScriptLoad}
      />
    </div>
  )
}
