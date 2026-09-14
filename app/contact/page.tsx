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
        </div>

        <div className="flex flex-col gap-8">
          <a
            href="https://instagram.com/seatonplace"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 text-gray-900 hover:text-gray-500 transition-colors"
          >
            <FaInstagram size={40} className="flex-shrink-0" />
            <div className="font-mono text-3xl md:text-4xl">@seatonplace</div>
          </a>

          <a
            href="https://tiktok.com/@seatonplace"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 text-gray-900 hover:text-gray-500 transition-colors"
          >
            <FaTiktok size={40} className="flex-shrink-0" />
            <div className="font-mono text-3xl md:text-4xl">@seatonplace</div>
          </a>

          <a
            href="https://youtube.com/@seatonplace"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 text-gray-900 hover:text-gray-500 transition-colors"
          >
            <FaYoutube size={40} className="flex-shrink-0" />
            <div className="font-mono text-3xl md:text-4xl">@seatonplace</div>
          </a>

          <a
            href="mailto:seatonplaceband@gmail.com"
            className="flex items-center gap-4 text-gray-900 hover:text-gray-500 transition-colors"
          >
            <MdEmail size={40} className="flex-shrink-0" />
            <div className="font-mono text-3xl md:text-4xl">seatonplaceband@gmail.com</div>
          </a>
        </div>
      </div>
    </div>
  )
}

