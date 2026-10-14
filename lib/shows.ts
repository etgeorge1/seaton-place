export type Show = {
  date: string
  isoDate: string
  venue: string
  ticketUrl: string
  imageUrl: string
}

export const SHOWS: Show[] = [
  {
    date: 'Thursday, September 10, 2026',
    isoDate: '2026-09-10',
    venue: 'Public Bar Live',
    ticketUrl: 'https://www.eventim.us/event/Chay-ViciousVeronas-CourtDisaster-ClubSeaton-Place/699574',
    imageUrl: '/images/PublicBar.png',
  },
  {
    date: 'Friday, October 23, 2026',
    isoDate: '2026-10-23',
    venue: 'The Artemis',
    ticketUrl: 'https://theartemisdc.com/events/1486/',
    imageUrl: '/images/Artemis%201023.png',
  },
]

// A show stays "upcoming" through the end of its day, in local time
export function isUpcoming(show: Show, now = new Date()) {
  const today = new Date(now)
  today.setHours(0, 0, 0, 0)
  return new Date(`${show.isoDate}T00:00:00`) >= today
}

export function nextShow(now = new Date()) {
  return SHOWS.filter((show) => isUpcoming(show, now)).sort((a, b) => a.isoDate.localeCompare(b.isoDate))[0]
}
