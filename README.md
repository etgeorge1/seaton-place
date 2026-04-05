# Band Website

Modern band website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Homepage** - Hero section, latest release, newsletter signup
- **Tour Dates** - Dynamic tour listing (ready for database integration)
- **Videos** - Video gallery (ready for YouTube API)
- **Contact** - Contact form and social links (ready for backend)

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React 18**

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

### Build for Production

```bash
npm run build
npm start
```

## Deployment to Vercel

### Quick Deploy (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repo
5. Click "Deploy"

That's it! Vercel auto-detects Next.js and configures everything.

### Environment Variables

When you add features later, add these in Vercel dashboard:

```
DATABASE_URL=your_postgres_url
STRIPE_SECRET_KEY=your_stripe_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_public_key
MAILCHIMP_API_KEY=your_mailchimp_key
```

## Next Steps - Adding Features

### 1. Mailing List Backend

Add Vercel Postgres:

```bash
npm install @vercel/postgres
```

Create `app/api/subscribe/route.ts`:

```typescript
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  const { email } = await request.json();
  
  await sql`
    INSERT INTO subscribers (email, created_at)
    VALUES (${email}, NOW())
  `;
  
  return Response.json({ success: true });
}
```

### 2. CMS for Tour Dates

Options:
- **Sanity** - Free tier, great DX
- **Contentful** - Good for non-technical team members
- **Prisma + Postgres** - Full control, more setup

### 3. YouTube Integration

```bash
npm install @googleapis/youtube
```

Fetch videos dynamically from your channel.

### 4. Merch Store

Options:
- **Stripe + Next.js** - Full control
- **Shopify Buy Button** - Quick embed
- **Big Cartel** - Band-focused platform

### 5. Contact Form Backend

Use Vercel's built-in edge functions or integrate:
- SendGrid
- Resend
- Nodemailer

## Customization

### Update Brand Colors

Edit `app/globals.css`:

```css
:root {
  --accent: #ff3366; /* Your band color */
  --bg-primary: #0a0a0a;
  /* etc */
}
```

### Update Band Name

1. Edit `app/layout.tsx` - Update metadata
2. Edit `components/Navigation.tsx` - Update logo
3. Edit `app/page.tsx` - Update hero text

### Add Pages

Create new route: `app/[page-name]/page.tsx`

## Project Structure

```
band-website/
├── app/
│   ├── layout.tsx          # Root layout with nav
│   ├── globals.css         # Global styles + design system
│   ├── page.tsx            # Homepage
│   ├── tour/page.tsx       # Tour dates
│   ├── videos/page.tsx     # Video gallery
│   └── contact/page.tsx    # Contact page
├── components/
│   └── Navigation.tsx      # Header nav
├── public/                 # Static assets (add images here)
└── package.json
```

## License

MIT
