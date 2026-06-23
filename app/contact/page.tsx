import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import BackHome from '../../components/BackHome';

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-8 pb-24 px-6 bg-soft-blush-50 text-gray-900">
      <div className="max-w-2xl mx-auto">
        <BackHome />
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold font-mono mb-6">
            GET IN TOUCH
          </h1>
          <p className="text-xl text-gray-600">
            For booking, press, or anything else, reach out or follow us below.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <a
            href="https://instagram.com/seatonplace"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 px-6 py-4 bg-soft-blush-100 border border-pink-orchid-300 hover:border-pink-orchid-700 hover:text-pink-orchid-800 transition-all group"
          >
            <FaInstagram size={24} className="flex-shrink-0" />
            <div>
              <div className="font-mono text-xs tracking-widest text-gray-500 group-hover:text-pink-orchid-700 mb-1">INSTAGRAM</div>
              <div className="font-mono text-sm">@seatonplace</div>
            </div>
          </a>

          <a
            href="https://tiktok.com/@seatonplace"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 px-6 py-4 bg-soft-blush-100 border border-pink-orchid-300 hover:border-pink-orchid-700 hover:text-pink-orchid-800 transition-all group"
          >
            <FaTiktok size={24} className="flex-shrink-0" />
            <div>
              <div className="font-mono text-xs tracking-widest text-gray-500 group-hover:text-pink-orchid-700 mb-1">TIKTOK</div>
              <div className="font-mono text-sm">@seatonplace</div>
            </div>
          </a>

          <a
            href="https://youtube.com/@seatonplace"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 px-6 py-4 bg-soft-blush-100 border border-pink-orchid-300 hover:border-pink-orchid-700 hover:text-pink-orchid-800 transition-all group"
          >
            <FaYoutube size={24} className="flex-shrink-0" />
            <div>
              <div className="font-mono text-xs tracking-widest text-gray-500 group-hover:text-pink-orchid-700 mb-1">YOUTUBE</div>
              <div className="font-mono text-sm">@seatonplace</div>
            </div>
          </a>

          <a
            href="mailto:seatonplaceband@gmail.com"
            className="flex items-center gap-4 px-6 py-4 bg-soft-blush-100 border border-pink-orchid-300 hover:border-pink-orchid-700 hover:text-pink-orchid-800 transition-all group"
          >
            <MdEmail size={24} className="flex-shrink-0" />
            <div>
              <div className="font-mono text-xs tracking-widest text-gray-500 group-hover:text-pink-orchid-700 mb-1">EMAIL</div>
              <div className="font-mono text-sm">seatonplaceband@gmail.com</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

