"use client";
import Link from 'next/link';
import LatestVideo from '../components/LatestVideo';

export default function HomeClient() {
  return (
    <div className="min-h-screen bg-deep-forest-50 text-deep-forest-900">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-sea-green-50 via-golden-glow-50 to-deep-forest-100">
        {/* Radial gradient background */}
        <div className="absolute inset-0 bg-gradient-radial from-tiger-orange-500/10 via-transparent to-transparent opacity-50" />
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <h1 className="text-7xl md:text-9xl font-bold font-mono mb-6 animate-slide-up">
            SEATON
            <span className="block text-tiger-orange-500 mt-2">PLACE</span>
          </h1>
          <p className="text-xl md:text-2xl text-deep-forest-700 mb-12 max-w-2xl mx-auto animate-slide-up animate-delay-1">
            Genre-bending sounds from Washington, DC.
            <br />
          </p>
          <div className="flex flex-wrap gap-4 justify-center animate-slide-up animate-delay-2">
            <Link
              href="/videos"
              className="px-8 py-4 border-2 border-deep-forest-800 text-deep-forest-900 font-mono font-bold tracking-wider hover:border-tiger-orange-500 hover:text-tiger-orange-500 transition-all"
            >
              WATCH VIDEOS
            </Link>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-tiger-orange-500/20 rotate-12 animate-pulse" />
        <div className="absolute bottom-40 right-20 w-24 h-24 border border-tiger-orange-500/20 -rotate-12 animate-pulse" style={{ animationDelay: '1s' }} />
      </section>
      {/* Latest Release Section */}
      <section className="py-24 px-6 border-t border-deep-forest-800 bg-deep-forest-100">
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
