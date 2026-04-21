export default function ContactPage() {
  return (
    <div className="min-h-screen py-24 px-6 bg-deep-forest-50 text-deep-forest-900">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold font-mono mb-6 text-gradient">
            GET IN TOUCH
          </h1>
          <p className="text-xl text-deep-forest-700">
            For booking, press, or anything else, reach out or follow us below.
          </p>
        </div>

        <div className="flex flex-col items-center gap-12">
          <div className="animate-slide-up animate-delay-2 w-full">
            <h2 className="text-2xl font-bold font-mono mb-6 text-center text-tiger-orange-500">CONNECT</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://instagram.com/seatonplace"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-deep-forest-100 border border-deep-forest-800 font-mono text-sm tracking-wider hover:border-tiger-orange-500 hover:text-tiger-orange-500 transition-all"
              >
                INSTAGRAM
              </a>
              <a
                href="https://youtube.com/@seatonplace"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-deep-forest-100 border border-deep-forest-800 font-mono text-sm tracking-wider hover:border-tiger-orange-500 hover:text-tiger-orange-500 transition-all"
              >
                YOUTUBE
              </a>
              <a
                href="mailto:seatonplaceband@gmail.com"
                className="px-6 py-3 bg-deep-forest-100 border border-deep-forest-800 font-mono text-sm tracking-wider hover:border-tiger-orange-500 hover:text-tiger-orange-500 transition-all"
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
