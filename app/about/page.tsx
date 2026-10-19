import Image, { type StaticImageData } from 'next/image'
import { FaUser } from 'react-icons/fa6'
import PageHeader from '../../components/PageHeader'
import harry from '../../public/images/HARRY.jpg'
import nick from '../../public/images/NICK.jpg'
import lucas from '../../public/images/LUCAS.jpg'

const MEMBERS: { name: string; role: string; photo?: StaticImageData; bio: string }[] = [
  {
    name: 'Harry',
    role: 'Vocals / Rhythm Guitar',
    photo: harry,
    bio: 'The Tom Petty of the group. Lifeblood of songwriting and band T-shirts.',
  },
  {
    name: 'Nick',
    role: 'Lead Guitar',
    photo: nick,
    bio: 'Unfortunately from Philly. Fortunately good enough at guitar to redeem himself.',
  },
  { name: 'Lucas', role: 'Bass', photo: lucas, bio: 'Your evil twin.' },
  { name: 'Ethan', role: 'Drums', bio: '⊗̷͒ Ƭ̷̵฿ ∵∴ §¶† ⟁⟒ Жξф ☡ ⌂⌖⌘ ¿¡ ☯̷ ❦ ∞≠≈ ӎ҉ ░▒▓ ✦ ඞ ⁂ ⨳⨷ ⎇⎈ ฅ^•ﻌ•^ฅ' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-8 pb-24 px-6 bg-soft-blush-50 text-gray-900">
      <div className="max-w-2xl mx-auto">
        <PageHeader title="ABOUT">
          <p className="text-xl text-gray-600">
            4-piece band from NE Washington, DC
          </p>
        </PageHeader>
        <div className="mt-12 flex flex-col gap-16">
          {MEMBERS.map(({ name, role, photo, bio }, i) => (
            <section key={name}>
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-200">
                {photo ? (
                  <Image
                    src={photo}
                    alt={name}
                    fill
                    placeholder="blur"
                    priority={i === 0}
                    sizes="(max-width: 672px) 100vw, 672px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-400" aria-label={`${name} (no photo)`}>
                    <FaUser className="h-1/3 w-1/3" />
                  </div>
                )}
              </div>
              <h2 className="mt-6 text-4xl font-bold font-mono">{name.toUpperCase()}</h2>
              <p className="mt-1 text-lg uppercase tracking-widest text-gray-500">{role}</p>
              <p className="mt-3 text-lg text-gray-600">{bio}</p>
            </section>
          ))}
        </div>
        <div className="mt-16 flex justify-center">
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
