"use client";
import Link from 'next/link';
import LatestVideo from '../components/LatestVideo';

export default function HomeClient() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Radial gradient background */}
        <div className="absolute inset-0 bg-gradient-radial from-[var(--accent)]/10 via-transparent to-transparent opacity-50" />
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <h1 className="text-7xl md:text-9xl font-bold font-mono mb-6 animate-slide-up">
            SEATON
            <span className="block text-[var(--accent)] mt-2">PLACE</span>
          </h1>
          <p className="text-xl md:text-2xl text-[var(--text-secondary)] mb-12 max-w-2xl mx-auto animate-slide-up animate-delay-1">
            Genre-bending sounds from Washington, DC.
            <br />
          </p>
          <div className="flex flex-wrap gap-4 justify-center animate-slide-up animate-delay-2">
            <Link
              href="/videos"
              className="px-8 py-4 border-2 border-[var(--border)] text-[var(--text-primary)] font-mono font-bold tracking-wider hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
            >
              WATCH VIDEOS
            </Link>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-[var(--accent)]/20 rotate-12 animate-pulse" />
        <div className="absolute bottom-40 right-20 w-24 h-24 border border-[var(--accent)]/20 -rotate-12 animate-pulse" style={{ animationDelay: '1s' }} />
      </section>
      {/* Latest Release Section */}
      <section className="py-24 px-6 border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-mono mb-12 text-gradient">
            LATEST RELEASE
          </h2>
          <LatestVideo />
        </div>
      </section>
    </div>
  );
}
