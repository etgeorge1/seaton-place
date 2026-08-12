import Link from 'next/link';
import { FaHouse } from 'react-icons/fa6';

export default function BackHome() {
  return (
    <Link
      href="/"
      aria-label="Home"
      className="inline-flex items-center mb-8 text-gray-900 hover:text-orange-accent-500 transition-colors"
    >
      <FaHouse size={28} />
    </Link>
  );
}
