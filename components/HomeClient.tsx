"use client";
import Link from 'next/link';
import BouncingLogo from '../components/BouncingLogo';
import { SOCIAL_LINKS, externalLinkProps } from '../lib/links';

export default function HomeClient() {
  return (
    <div className="h-screen overflow-hidden bg-soft-blush-50 flex flex-col items-center justify-center">
      <BouncingLogo />

      <div className="relative z-10 flex flex-col items-center text-center select-none">
        {/* Page links */}
        <nav className="flex flex-col items-center gap-8 mb-16">
          <Link
            href="/videos"
            className="text-4xl md:text-5xl font-mono tracking-widest text-gray-900 hover:text-gray-500 transition-colors"
          >
            VIDEOS
          </Link>
          <Link
            href="/about"
            className="text-4xl md:text-5xl font-mono tracking-widest text-gray-900 hover:text-gray-500 transition-colors"
          >
            ABOUT
          </Link>
          <Link
            href="/shows"
            className="text-4xl md:text-5xl font-mono tracking-widest text-gray-900 hover:text-gray-500 transition-colors"
          >
            SHOWS
          </Link>
          <Link
            href="/gallery"
            className="text-4xl md:text-5xl font-mono tracking-widest text-gray-900 hover:text-gray-500 transition-colors"
          >
            GALLERY
          </Link>
        </nav>

        {/* Social links */}
        <div className="flex gap-10">
          {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              {...externalLinkProps(href)}
              aria-label={label}
              className="text-gray-900 hover:text-gray-500 transition-colors"
            >
              <Icon size={36} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
