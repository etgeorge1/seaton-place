export default function TourPage() {
  // This will eventually come from a database or CMS
  const shows = [
    {
      id: 1,
      date: '2024-04-15',
      city: 'Washington',
      state: 'DC',
      venue: 'The Black Cat',
      ticketUrl: '#',
      soldOut: false,
    },
    {
      id: 2,
      date: '2024-04-18',
      city: 'Philadelphia',
      state: 'PA',
      venue: 'Union Transfer',
      ticketUrl: '#',
      soldOut: false,
    },
    {
      id: 3,
      date: '2024-04-22',
      city: 'New York',
      state: 'NY',
      venue: 'Bowery Ballroom',
      ticketUrl: '#',
      soldOut: true,
    },
    {
      id: 4,
      date: '2024-04-26',
      city: 'Boston',
      state: 'MA',
      venue: 'Paradise Rock Club',
      ticketUrl: '#',
      soldOut: false,
    },
    {
      id: 5,
      date: '2024-05-02',
      city: 'Chicago',
      state: 'IL',
      venue: 'Metro Chicago',
      ticketUrl: '#',
      soldOut: false,
    },
  ]

  return (
    <div className="min-h-screen py-24 px-6 bg-deep-forest-50 text-deep-forest-900">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold font-mono mb-6 text-gradient">
            TOUR DATES
          </h1>
          <p className="text-xl text-deep-forest-700">
            Catch us live across North America
          </p>
        </div>

        {/* Shows List */}
        <div className="space-y-4">
          {shows.map((show, index) => {
            const showDate = new Date(show.date)
            const month = showDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
            const day = showDate.getDate()

            return (
              <div
                key={show.id}
                className="group border border-deep-forest-800 p-6 hover:border-tiger-orange-500 transition-all bg-deep-forest-100/50 backdrop-blur-sm animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  {/* Date */}
                  <div className="flex-shrink-0 w-24 text-center border-r border-deep-forest-800 pr-6">
                    <div className="text-3xl font-bold font-mono text-tiger-orange-500">{day}</div>
                    <div className="text-sm font-mono text-deep-forest-700">{month}</div>
                  </div>

                  {/* Location & Venue */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold mb-1">
                      {show.city}, {show.state}
                    </h3>
                    <p className="text-deep-forest-700 font-mono text-sm">
                      {show.venue}
                    </p>
                  </div>

                  {/* Ticket Button */}
                  <div className="flex-shrink-0">
                    {show.soldOut ? (
                      <div className="px-8 py-3 bg-deep-forest-50 border border-deep-forest-800 text-deep-forest-700 font-mono text-sm tracking-wider cursor-not-allowed">
                        SOLD OUT
                      </div>
                    ) : (
                      <a
                        href={show.ticketUrl}
                        className="block px-8 py-3 bg-tiger-orange-500 text-white font-mono font-bold text-sm tracking-wider hover:bg-tiger-orange-400 transition-all accent-glow text-center"
                      >
                        TICKETS
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* No shows message (toggle based on data) */}
        {shows.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-deep-forest-700 font-mono">
              No upcoming shows scheduled.
              <br />
              Check back soon or sign up for our mailing list!
            </p>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-20 p-12 border border-[var(--border)] bg-[var(--bg-secondary)] text-center">
          <h2 className="text-3xl font-bold font-mono mb-4">
            NEVER MISS A SHOW
          </h2>
          <p className="text-[var(--text-secondary)] mb-6">
            Get notified when we add new tour dates in your area
          </p>
          <button className="px-8 py-4 bg-[var(--accent)] text-white font-mono font-bold tracking-wider hover:bg-[var(--accent)]/80 transition-all accent-glow">
            SUBSCRIBE TO MAILING LIST
          </button>
        </div>
      </div>
    </div>
  )
}
