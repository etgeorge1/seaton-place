import Link from 'next/link';

export default function BackHome() {
  return (
    <Link
      href="/"
      className="block mb-8 font-mono text-xs tracking-widest text-gray-900 hover:text-orange-accent-500 transition-colors"
    >
      ← HOME
    </Link>
  );
}
