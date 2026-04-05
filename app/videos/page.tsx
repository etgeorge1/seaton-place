export default function VideosPage() {
  // This will eventually come from YouTube API or CMS
  const videos = [
    {
      id: 1,
      title: 'New Single - "Song Title"',
      description: 'Official Music Video',
      embedId: 'dQw4w9WgXcQ', // Replace with real YouTube IDs
      thumbnail: null,
    },
    {
      id: 2,
      title: 'Live at The Anthem',
      description: 'Full Set - DC 2024',
      embedId: 'dQw4w9WgXcQ',
      thumbnail: null,
    },
    {
      id: 3,
      title: 'Behind The Scenes',
      description: 'Recording the new album',
      embedId: 'dQw4w9WgXcQ',
      thumbnail: null,
    },
    {
      id: 4,
      title: 'Acoustic Session',
      description: 'Stripped down versions',
      embedId: 'dQw4w9WgXcQ',
      thumbnail: null,
    },
  ]

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold font-mono mb-6 text-gradient">
            VIDEOS
          </h1>
          <p className="text-xl text-[var(--text-secondary)]">
            Music videos, live performances, and behind the scenes
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Video Container */}
              <div className="relative aspect-video bg-[var(--bg-secondary)] border border-[var(--border)] overflow-hidden mb-4 group-hover:border-[var(--accent)] transition-all">
                {/* Placeholder for YouTube embed */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 border-2 border-[var(--accent)] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg
                        className="w-8 h-8 text-[var(--accent)] ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="text-[var(--text-secondary)] text-sm font-mono">
                      YouTube Embed
                    </p>
                  </div>
                </div>

                {/* Uncomment this and remove placeholder when you have real YouTube IDs */}
                {/* <iframe
                  src={`https://www.youtube.com/embed/${video.embedId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                /> */}
              </div>

              {/* Video Info */}
              <div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--accent)] transition-colors">
                  {video.title}
                </h3>
                <p className="text-[var(--text-secondary)] font-mono text-sm">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 p-12 border border-[var(--border)] bg-[var(--bg-secondary)] text-center">
          <h2 className="text-3xl font-bold font-mono mb-4">
            SUBSCRIBE ON YOUTUBE
          </h2>
          <p className="text-[var(--text-secondary)] mb-6">
            Get notified when we drop new music videos and live performances
          </p>
          <a
            href="#"
            className="inline-block px-8 py-4 bg-[var(--accent)] text-white font-mono font-bold tracking-wider hover:bg-[var(--accent)]/80 transition-all accent-glow"
          >
            YOUTUBE CHANNEL
          </a>
        </div>
      </div>
    </div>
  )
}
