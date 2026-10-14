import PageHeader from '../../components/PageHeader'
import { SOCIAL_LINKS, externalLinkProps } from '../../lib/links'

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-8 pb-24 px-6 bg-soft-blush-50 text-gray-900">
      <div className="max-w-2xl mx-auto">
        <PageHeader title="GET IN TOUCH" />

        <div className="flex flex-col gap-8">
          {SOCIAL_LINKS.map(({ label, handle, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              {...externalLinkProps(href)}
              className="flex items-center gap-4 text-gray-900 hover:text-gray-500 transition-colors"
            >
              <Icon size={40} className="flex-shrink-0" />
              <div className="font-mono text-3xl md:text-4xl">{handle}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
