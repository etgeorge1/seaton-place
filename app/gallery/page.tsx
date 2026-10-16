import PageHeader from '../../components/PageHeader'
import PhotoGallery from '../../components/PhotoGallery'
import type { GalleryPage } from '../../lib/gallery'
import { getGalleryPage } from '../../lib/gallery-cache'

export const revalidate = 3600

export default async function GalleryPage() {
  let page: GalleryPage | null = null
  let error: string | null = null
  try {
    page = await getGalleryPage()
    if (page.items.length === 0) error = 'No photos yet.'
  } catch (e) {
    console.error('Failed to load gallery', e)
    error = 'Failed to load photos.'
  }

  return (
    <div className="min-h-screen pt-8 pb-24 px-6 bg-soft-blush-50 text-gray-900">
      <div className="max-w-7xl mx-auto">
        <PageHeader title="GALLERY" />

        {error || !page ? (
          <div className="text-center py-20 text-gray-500">{error}</div>
        ) : (
          <PhotoGallery initialPhotos={page.items} initialNextOffset={page.nextOffset} />
        )}
      </div>
    </div>
  )
}
