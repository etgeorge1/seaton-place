import Image from 'next/image';
import BackHome from '../../components/BackHome';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-8 pb-24 px-6 bg-soft-blush-50 text-gray-900">
      <div className="max-w-2xl mx-auto">
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <BackHome />
            <h1 className="text-5xl md:text-7xl font-bold font-mono">
              ABOUT
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            4-piece band from NE Washington, DC. Blends of garage rock, classic rock, and blues. Not afraid to get a little jammy.
          </p>
        </div>
        <div className="mt-12 flex justify-center">
          <Image
            src="/logo.svg"
            alt="Seaton Place logo"
            width={200}
            height={200}
          />
        </div>
      </div>
    </div>
  )
}
