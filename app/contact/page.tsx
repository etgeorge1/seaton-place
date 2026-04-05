export default function ContactPage() {
  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold font-mono mb-6 text-gradient">
            GET IN TOUCH
          </h1>
          <p className="text-xl text-[var(--text-secondary)]">
            Booking, press, or just want to say hi
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="animate-slide-up">
              <h2 className="text-2xl font-bold font-mono mb-4">BOOKING</h2>
              <p className="text-[var(--text-secondary)]">
                <a
                  href="mailto:booking@yourband.com"
                  className="hover:text-[var(--accent)] transition-colors"
                >
                  booking@yourband.com
                </a>
              </p>
            </div>

            <div className="animate-slide-up animate-delay-1">
              <h2 className="text-2xl font-bold font-mono mb-4">PRESS</h2>
              <p className="text-[var(--text-secondary)]">
                <a
                  href="mailto:press@yourband.com"
                  className="hover:text-[var(--accent)] transition-colors"
                >
                  press@yourband.com
                </a>
              </p>
            </div>

            <div className="animate-slide-up animate-delay-2">
              <h2 className="text-2xl font-bold font-mono mb-6">FOLLOW US</h2>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#"
                  className="px-6 py-3 bg-[var(--bg-secondary)] border border-[var(--border)] font-mono text-sm tracking-wider hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
                >
                  INSTAGRAM
                </a>
                <a
                  href="#"
                  className="px-6 py-3 bg-[var(--bg-secondary)] border border-[var(--border)] font-mono text-sm tracking-wider hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
                >
                  TWITTER
                </a>
                <a
                  href="#"
                  className="px-6 py-3 bg-[var(--bg-secondary)] border border-[var(--border)] font-mono text-sm tracking-wider hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
                >
                  FACEBOOK
                </a>
                <a
                  href="#"
                  className="px-6 py-3 bg-[var(--bg-secondary)] border border-[var(--border)] font-mono text-sm tracking-wider hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
                >
                  SPOTIFY
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form Placeholder */}
          <div className="animate-slide-up animate-delay-3">
            <h2 className="text-2xl font-bold font-mono mb-6">SEND A MESSAGE</h2>
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] font-mono focus:border-[var(--accent)] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] font-mono focus:border-[var(--accent)] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <textarea
                  rows={6}
                  placeholder="Message"
                  className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] font-mono focus:border-[var(--accent)] focus:outline-none transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-[var(--accent)] text-white font-mono font-bold tracking-wider hover:bg-[var(--accent)]/80 transition-all accent-glow"
              >
                SEND MESSAGE
              </button>
              <p className="text-[var(--text-secondary)] text-sm font-mono text-center">
                (Form backend coming soon)
              </p>
            </form>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-20 p-12 border border-[var(--border)] bg-[var(--bg-secondary)] text-center">
          <h2 className="text-3xl font-bold font-mono mb-4">
            JOIN OUR MAILING LIST
          </h2>
          <p className="text-[var(--text-secondary)] mb-6 max-w-2xl mx-auto">
            Get exclusive updates, early access to tickets, and behind-the-scenes content delivered to your inbox
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
        </div>
      </div>
    </div>
  )
}
