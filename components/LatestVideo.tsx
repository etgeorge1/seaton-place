import { CHANNEL_ID, fetchChannelVideos } from '../lib/youtube'

export default async function LatestVideo() {
  let video
  try {
    const page = await fetchChannelVideos(CHANNEL_ID, { maxResults: 1 })
    video = page.items[0]
  } catch (e) {
    return <div className="text-center py-12 text-red-500">Failed to load video.</div>
  }
  if (!video) return <div className="text-center py-12 text-red-500">No videos found.</div>

  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div className="aspect-video bg-soft-blush-100 border border-pink-orchid-300 flex items-center justify-center overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${video.id}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="w-full h-full"
          frameBorder="0"
        />
      </div>
      <div>
        <h3 className="text-3xl font-bold mb-4 text-orange-accent-500">{video.title}</h3>
        <p className="text-gray-600 text-lg mb-6">
          {video.publishedAt
            ? `Released ${new Date(video.publishedAt).toLocaleDateString('en-US', { timeZone: 'UTC' })}`
            : null}
        </p>
        <div className="flex gap-4">
          <a
            href={`https://youtu.be/${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-soft-blush-100 border border-pink-orchid-300 font-mono text-sm tracking-wider hover:border-orange-accent-500 hover:text-orange-accent-500 transition-all"
          >
            WATCH ON YOUTUBE
          </a>
        </div>
      </div>
    </div>
  )
}
