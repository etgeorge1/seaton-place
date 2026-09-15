"use client";
import BackHome from '../../components/BackHome';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FaYoutube } from 'react-icons/fa6';

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
  const sentinelRef = useRef<HTMLDivElement | null>(null);

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

  const loadMore = useCallback(async () => {
    if (!nextPageToken || loadingMore) return;
    setLoadingMore(true);
    try {
      const res = await fetch(`/api/youtube-videos?channelId=${CHANNEL_ID}&pageToken=${nextPageToken}`);
      const data = await res.json();
      setVideos(prev => [...prev, ...data.items.map(mapItem)]);
      setNextPageToken(data.nextPageToken || null);
    } catch (e) {
      // user can retry by scrolling again
    } finally {
      setLoadingMore(false);
    }
  }, [nextPageToken, loadingMore]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !nextPageToken) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [nextPageToken, loadMore]);

  return (
    <div className="min-h-screen pt-8 pb-24 px-6 bg-soft-blush-50 text-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="flex items-center gap-4">
            <BackHome />
            <h1 className="text-5xl md:text-7xl font-bold font-mono">
              VIDEOS
            </h1>
          </div>
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

        {nextPageToken && <div ref={sentinelRef} className="h-1" />}

        {loadingMore && (
          <div className="text-center py-8 text-gray-500">Loading more videos…</div>
        )}

        {/* Call to Action */}
        {!loading && !loadingMore && (
          <div className="mt-20 flex justify-center">
            <a
              href="https://youtube.com/@seatonplace?si=hhY0i1wE4_uLEysi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-gray-900 hover:text-gray-500 transition-colors"
            >
              <FaYoutube size={56} />
              <span className="font-mono font-bold text-3xl md:text-4xl tracking-wider">GO TO CHANNEL</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
