import type { Metadata } from 'next'
import AdminLogin from '../../../components/AdminLogin'
import AdminPhotoGrid from '../../../components/AdminPhotoGrid'
import GalleryUploader from '../../../components/GalleryUploader'
import PageHeader from '../../../components/PageHeader'
import { isAdmin } from '../../../lib/admin-auth'
import { readPhotos, toGalleryPhoto } from '../../../lib/gallery-store'

export const metadata: Metadata = { robots: { index: false, follow: false } }

export default async function GalleryAdminPage() {
  const authed = await isAdmin()
  const photos = authed ? (await readPhotos()).map(toGalleryPhoto) : []

  return (
    <div className="min-h-screen pt-8 pb-24 px-6 bg-soft-blush-50 text-gray-900">
      <div className="max-w-7xl mx-auto">
        <PageHeader title="GALLERY ADMIN" />
        {authed ? (
          <div className="space-y-12">
            <GalleryUploader />
            <AdminPhotoGrid photos={photos} />
          </div>
        ) : (
          <AdminLogin />
        )}
      </div>
    </div>
  )
}
