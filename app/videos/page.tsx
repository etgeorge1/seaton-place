"use client";
import BackHome from '../../components/BackHome';
import { useEffect, useState } from 'react';

type Video = {
  id: string;
  title: string;
  embedId: string;
};

const CHANNEL_ID = 'UCf1wviL6ThP-vvnjK0EwgbA';

function mapItem(item: any): Video {
  return {
    id: item.snippet.resourceId.videoId,
    title: item.snippet.title,
    embedId: item.snippet.resourceId.videoId,
  };
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInitial() {
      try {
        const res = await fetch(`/api/youtube-videos?channelId=${CHANNEL_ID}`);
        const data = await res.json();
        if (data.items && data.items.length > 0) {
          setVideos(data.items.map(mapItem));
          setNextPageToken(data.nextPageToken || null);
        } else {
          setError('No videos found.');
        }
      } catch (e) {
        setError('Failed to load videos.');
      } finally {
        setLoading(false);
      }
    }
    fetchInitial();
  }, []);

  async function loadMore() {
    if (!nextPageToken || loadingMore) return;
    setLoadingMore(true);
    try {
      const res = await fetch(`/api/youtube-videos?channelId=${CHANNEL_ID}&pageToken=${nextPageToken}`);
      const data = await res.json();
      setVideos(prev => [...prev, ...data.items.map(mapItem)]);
      setNextPageToken(data.nextPageToken || null);
    } catch (e) {
      // user can retry by clicking again
    } finally {
      setLoadingMore(false);
    }
  }

  return (
    <div className="min-h-screen pt-8 pb-24 px-6 bg-soft-blush-50 text-gray-900">
      <div className="max-w-7xl mx-auto">
        <BackHome />
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold font-mono mb-6">
            VIDEOS
          </h1>
        </div>

        {loading ? (
          <div className="text-center py-20 text-xl">Loading videos…</div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">{error}</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {videos.map((video, index) => (
              <div
                key={video.id}
                className="group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Video Container */}
                <div className="relative aspect-video bg-soft-blush-100 border border-pink-orchid-300 overflow-hidden mb-4 group-hover:border-orange-accent-500 transition-all">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.embedId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                  />
                </div>

                {/* Video Info */}
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    {video.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}

        {nextPageToken && (
          <div className="mt-12 text-center">
            <button
              onClick={loadMore}
              disabled={loadingMore}
              className="px-8 py-3 border border-pink-orchid-300 font-mono text-sm tracking-wider hover:border-orange-accent-500 hover:text-orange-accent-500 transition-all disabled:opacity-50"
            >
              {loadingMore ? 'LOADING…' : 'LOAD MORE'}
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-20 p-12 border border-pink-orchid-300 bg-soft-blush-100 text-center">
          <h2 className="text-3xl font-bold font-mono mb-4 text-pink-orchid-700">
            SUBSCRIBE ON YOUTUBE
          </h2>
          <p className="text-gray-600 mb-6">
            Get notified when we drop new music videos and live performances
          </p>
          <a
            href="https://youtube.com/@seatonplace?si=hhY0i1wE4_uLEysi"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary accent-glow"
          >
            YOUTUBE CHANNEL
          </a>
        </div>
      </div>
    </div>
  );
}
