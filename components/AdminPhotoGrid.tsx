'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaTrash } from 'react-icons/fa6'
import { photoLoader, type GalleryPhoto } from '../lib/gallery'

export default function AdminPhotoGrid({ photos }: { photos: GalleryPhoto[] }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState<string | null>(null)

  async function remove(id: string) {
    if (!confirm('Delete this photo from the gallery?')) return
    setDeleting(id)
    const res = await fetch(`/api/gallery/photos/${id}`, { method: 'DELETE' }).catch(() => null)
    setDeleting(null)
    if (res?.ok) router.refresh()
    else alert('Delete failed.')
  }

  async function logout() {
    await fetch('/api/admin/session', { method: 'DELETE' })
    router.refresh()
  }

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-mono text-2xl tracking-wider">{photos.length} PHOTOS</h2>
        <button type="button" onClick={logout} className="font-mono tracking-wider text-gray-500 hover:text-gray-900">
          SIGN OUT
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
        {photos.map((photo) => (
          <div key={photo.id} className="group relative aspect-square overflow-hidden bg-soft-blush-100">
            <Image
              loader={photoLoader}
              src={photo.src}
              alt=""
              fill
              sizes="200px"
              placeholder="blur"
              blurDataURL={photo.blurDataURL}
              className={`object-cover ${deleting === photo.id ? 'opacity-30' : ''}`}
            />
            <button
              type="button"
              onClick={() => remove(photo.id)}
              disabled={deleting !== null}
              aria-label="Delete photo"
              className="absolute right-1 top-1 bg-white/90 p-2 text-red-600 opacity-100 transition-opacity hover:bg-white md:opacity-0 md:group-hover:opacity-100 md:focus:opacity-100"
            >
              <FaTrash size={14} />
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
