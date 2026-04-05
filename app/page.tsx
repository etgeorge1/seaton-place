import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Radial gradient background */}
        <div className="absolute inset-0 bg-gradient-radial from-[var(--accent)]/10 via-transparent to-transparent opacity-50" />
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <h1 className="text-7xl md:text-9xl font-bold font-mono mb-6 animate-slide-up">
            THE BAND
            <span className="block text-[var(--accent)] mt-2">NAME</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[var(--text-secondary)] mb-12 max-w-2xl mx-auto animate-slide-up animate-delay-1">
            Genre-bending sounds from Washington, DC.
            <br />
            Currently on tour across North America.
          </p>

          <div className="flex flex-wrap gap-4 justify-center animate-slide-up animate-delay-2">
            <Link
              href="/tour"
              className="px-8 py-4 bg-[var(--accent)] text-white font-mono font-bold tracking-wider hover:bg-[var(--accent)]/80 transition-all hover:scale-105 accent-glow"
            >
              VIEW TOUR DATES
            </Link>
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
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-square bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center">
              <span className="text-[var(--text-secondary)] font-mono text-sm">ALBUM ARTWORK</span>
            </div>
            
            <div>
              <h3 className="text-3xl font-bold mb-4">Album Title Here</h3>
              <p className="text-[var(--text-secondary)] text-lg mb-6">
                Released March 2024 via Independent Records
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="px-6 py-3 bg-[var(--bg-secondary)] border border-[var(--border)] font-mono text-sm tracking-wider hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
                >
                  SPOTIFY
                </a>
                <a
                  href="#"
                  className="px-6 py-3 bg-[var(--bg-secondary)] border border-[var(--border)] font-mono text-sm tracking-wider hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
                >
                  APPLE MUSIC
                </a>
                <a
                  href="#"
                  className="px-6 py-3 bg-[var(--bg-secondary)] border border-[var(--border)] font-mono text-sm tracking-wider hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
                >
                  BANDCAMP
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 px-6 border-t border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-mono mb-6">
            STAY IN THE LOOP
          </h2>
          <p className="text-[var(--text-secondary)] text-lg mb-8">
            Sign up for tour announcements, new releases, and exclusive content.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-6 py-4 bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] font-mono focus:border-[var(--accent)] focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-[var(--accent)] text-white font-mono font-bold tracking-wider hover:bg-[var(--accent)]/80 transition-all accent-glow"
            >
              SUBSCRIBE
            </button>
          </form>
          <p className="text-[var(--text-secondary)] text-sm mt-4 font-mono">
            (Backend coming soon - form is placeholder)
          </p>
        </div>
      </section>
    </div>
  )
}
