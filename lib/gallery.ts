import type { ImageLoader } from 'next/image'

// Client-safe gallery types and helpers (no server imports)

export const VARIANT_WIDTHS = [400, 1200, 2400] as const
export const GALLERY_PAGE_SIZE = 24
export const MAX_UPLOAD_BYTES = 50 * 1024 * 1024
export const ALLOWED_UPLOAD_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export type Photo = {
  id: string
  width: number
  height: number
  blurDataURL: string
  uploadedAt: string
}

export type GalleryPhoto = Photo & {
  // Base URL; variants live at `${src}/${width}.webp`
  src: string
}

export type GalleryPage = {
  items: GalleryPhoto[]
  nextOffset: number | null
}

export const photoLoader: ImageLoader = ({ src, width }) => {
  const variant = VARIANT_WIDTHS.find((w) => w >= width) ?? VARIANT_WIDTHS[VARIANT_WIDTHS.length - 1]
  return `${src}/${variant}.webp`
}
