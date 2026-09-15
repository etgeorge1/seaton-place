"use client";
import Link from 'next/link';
import BouncingLogo from '../components/BouncingLogo';
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';

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
        </nav>

        {/* Social links */}
        <div className="flex gap-10">
          <a
            href="https://instagram.com/seatonplace"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 hover:text-gray-500 transition-colors"
          >
            <FaInstagram size={36} />
          </a>
          <a
            href="https://tiktok.com/@seatonplace"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 hover:text-gray-500 transition-colors"
          >
            <FaTiktok size={36} />
          </a>
          <a
            href="https://youtube.com/@seatonplace"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 hover:text-gray-500 transition-colors"
          >
            <FaYoutube size={36} />
          </a>
          <a
            href="mailto:seatonplaceband@gmail.com"
            className="text-gray-900 hover:text-gray-500 transition-colors"
          >
            <MdEmail size={36} />
          </a>
        </div>
      </div>
    </div>
  );
}
