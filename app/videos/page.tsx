"use client";
import { useEffect, useState } from 'react';

type Video = {
  id: string;
  title: string;
  description: string;
  embedId: string;
};

const PLAYLIST_ID = 'PLQ6P3ZZt1s5FNDouT2SaHuTh2MyqwkNrg';
const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch(`/api/youtube-playlist?playlistId=${PLAYLIST_ID}&apiKey=${API_KEY}`);
        const data = await res.json();
        if (data.items) {
          setVideos(
            data.items.map((item: any) => ({
              id: item.snippet.resourceId.videoId,
              title: item.snippet.title,
              description: item.snippet.description,
              embedId: item.snippet.resourceId.videoId,
            }))
          );
        } else {
          setError('No videos found.');
        }
      } catch (e) {
        setError('Failed to load videos.');
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen py-24 px-6 bg-deep-forest-50 text-deep-forest-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold font-mono mb-6 text-gradient">
            VIDEOS
          </h1>
          <p className="text-xl text-deep-forest-700">
            Music videos, live performances, and behind the scenes
          </p>
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
                <div className="relative aspect-video bg-deep-forest-100 border border-deep-forest-800 overflow-hidden mb-4 group-hover:border-tiger-orange-500 transition-all">
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
                  <h3 className="text-xl font-bold mb-2 group-hover:text-tiger-orange-500 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-deep-forest-700 font-mono text-sm">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-20 p-12 border border-deep-forest-800 bg-deep-forest-100 text-center">
          <h2 className="text-3xl font-bold font-mono mb-4 text-tiger-orange-500">
            SUBSCRIBE ON YOUTUBE
          </h2>
          <p className="text-deep-forest-700 mb-6">
            Get notified when we drop new music videos and live performances
          </p>
          <a
            href="https://youtube.com/@seatonplace?si=hhY0i1wE4_uLEysi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-tiger-orange-500 text-white font-mono font-bold tracking-wider hover:bg-tiger-orange-400 transition-all accent-glow"
          >
            YOUTUBE CHANNEL
          </a>
        </div>
      </div>
    </div>
  );
}
