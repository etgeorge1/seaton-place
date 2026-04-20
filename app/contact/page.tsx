export default function ContactPage() {
  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold font-mono mb-6 text-gradient">
            GET IN TOUCH
          </h1>
          <p className="text-xl text-[var(--text-secondary)]">
            For booking, press, or anything else, reach out or follow us below.
          </p>
        </div>

        <div className="flex flex-col items-center gap-12">
          <div className="animate-slide-up animate-delay-2 w-full">
            <h2 className="text-2xl font-bold font-mono mb-6 text-center">CONNECT</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://instagram.com/seatonplace"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[var(--bg-secondary)] border border-[var(--border)] font-mono text-sm tracking-wider hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
              >
                INSTAGRAM
              </a>
              <a
                href="https://youtube.com/@seatonplace"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[var(--bg-secondary)] border border-[var(--border)] font-mono text-sm tracking-wider hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
              >
                YOUTUBE
              </a>
              <a
                href="mailto:seatonplaceband@gmail.com"
                className="px-6 py-3 bg-[var(--bg-secondary)] border border-[var(--border)] font-mono text-sm tracking-wider hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
              >
                GMAIL
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
