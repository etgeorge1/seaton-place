"use client";
import { useEffect, useState } from "react";

export default function LatestVideo() {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const PLAYLIST_ID = "PLQ6P3ZZt1s5FNDouT2SaHuTh2MyqwkNrg";

  useEffect(() => {
    async function fetchLatest() {
      try {
        const res = await fetch(`/api/youtube-playlist?playlistId=${PLAYLIST_ID}`);
        const data = await res.json();
        if (data.items && data.items.length > 0) {
          // Most recent video is usually first
          const latest = data.items[0];
          setVideo({
            id: latest.snippet.resourceId.videoId,
            title: latest.snippet.title,
            description: latest.snippet.description,
            embedId: latest.snippet.resourceId.videoId,
            publishedAt: latest.snippet.publishedAt,
            thumbnail: latest.snippet.thumbnails?.high?.url || null,
          });
        } else {
          setError("No videos found.");
        }
      } catch (e) {
        setError("Failed to load video.");
      } finally {
        setLoading(false);
      }
    }
    fetchLatest();
  }, []);

  if (loading) return <div className="text-center py-12">Loading latest video…</div>;
  if (error) return <div className="text-center py-12 text-red-500">{error}</div>;
  if (!video) return null;

  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div className="aspect-video bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${video.embedId}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="w-full h-full"
          frameBorder="0"
        />
      </div>
      <div>
        <h3 className="text-3xl font-bold mb-4">{video.title}</h3>
        <p className="text-[var(--text-secondary)] text-lg mb-6">
          {video.publishedAt ? `Released ${new Date(video.publishedAt).toLocaleDateString()}` : null}
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
          {video.description}
        </p>
        <div className="flex gap-4">
          <a
            href={`https://youtu.be/${video.embedId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[var(--bg-secondary)] border border-[var(--border)] font-mono text-sm tracking-wider hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
          >
            WATCH ON YOUTUBE
          </a>
        </div>
      </div>
    </div>
  );
}
