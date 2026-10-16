import { unstable_cache } from 'next/cache'
import { GALLERY_PAGE_SIZE, type GalleryPage } from './gallery'
import { readPhotos, toGalleryPhoto } from './gallery-store'

export const GALLERY_CACHE_TAG = 'gallery'
export const GALLERY_REVALIDATE_SECONDS = 3600

const getCachedPhotos = unstable_cache(readPhotos, ['gallery-photos'], {
  revalidate: GALLERY_REVALIDATE_SECONDS,
  tags: [GALLERY_CACHE_TAG],
})

export async function getGalleryPage(offset = 0, limit = GALLERY_PAGE_SIZE): Promise<GalleryPage> {
  const photos = await getCachedPhotos()
  const end = offset + limit
  return {
    items: photos.slice(offset, end).map(toGalleryPhoto),
    nextOffset: end < photos.length ? end : null,
  }
}
