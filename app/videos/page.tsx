import { FaYoutube } from 'react-icons/fa6'
import PageHeader from '../../components/PageHeader'
import VideoGrid from '../../components/VideoGrid'
import { YOUTUBE_URL } from '../../lib/links'
import { CHANNEL_ID, fetchChannelVideos, type VideoPage } from '../../lib/youtube'

export const revalidate = 3600

export default async function VideosPage() {
  let page: VideoPage | null = null
  let error: string | null = null
  try {
    page = await fetchChannelVideos(CHANNEL_ID)
    if (page.items.length === 0) error = 'No videos found.'
  } catch (e) {
    error = 'Failed to load videos.'
  }

  return (
    <div className="min-h-screen pt-8 pb-24 px-6 bg-soft-blush-50 text-gray-900">
      <div className="max-w-7xl mx-auto">
        <PageHeader title="VIDEOS" />

        {error || !page ? (
          <div className="text-center py-20 text-red-500">{error}</div>
        ) : (
          <VideoGrid
            initialVideos={page.items}
            initialNextPageToken={page.nextPageToken}
          />
        )}

        <div className="mt-20 flex justify-center">
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 text-gray-900 hover:text-gray-500 transition-colors"
          >
            <FaYoutube size={56} />
            <span className="font-mono font-bold text-3xl md:text-4xl tracking-wider">GO TO CHANNEL</span>
          </a>
        </div>
      </div>
    </div>
  )
}
