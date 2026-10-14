# Seaton Place

Official website for Seaton Place, built with Next.js (App Router), TypeScript, and Tailwind CSS. Deployed on Vercel.

## Pages

- **Home** (`/`) – bouncing logo, page links, social links
- **Videos** (`/videos`) – YouTube uploads, server-rendered first page with infinite scroll
- **Shows** (`/shows`) – upcoming / past shows
- **About** (`/about`)
- **Contact** (`/contact`) – social and email links

A popup announcing the next upcoming show appears once per browser session.

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create `.env.local` (and set the same in Vercel):

```
YOUTUBE_API_KEY=your_youtube_data_api_key
```

The key is only used server-side. YouTube responses are cached for an hour.

## Updating Content

- **Shows** – edit `SHOWS` in `lib/shows.ts`; put flyers in `public/images/`
- **Social links** – edit `SOCIAL_LINKS` in `lib/links.ts`
- **YouTube channel** – `CHANNEL_ID` in `lib/youtube.ts`

## Project Structure

```
app/
  layout.tsx                 # Root layout, fonts, show popup, analytics
  page.tsx                   # Home
  about/ contact/ shows/ videos/
  api/youtube-videos/route.ts  # Pagination endpoint for the videos grid
components/                  # UI components
lib/
  links.ts                   # Social links
  shows.ts                   # Show data and date helpers
  youtube.ts                 # YouTube Data API client
public/                      # Logo and show flyers
```

## Scripts

- `pnpm dev` – development server
- `pnpm build` / `pnpm start` – production build
- `pnpm lint` – ESLint

A Husky pre-push hook runs `pnpm build`.
