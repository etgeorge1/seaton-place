import type { IconType } from 'react-icons'
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'

export type SocialLink = {
  label: string
  handle: string
  href: string
  icon: IconType
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'Instagram', handle: '@seatonplace', href: 'https://instagram.com/seatonplace', icon: FaInstagram },
  { label: 'TikTok', handle: '@seatonplace', href: 'https://tiktok.com/@seatonplace', icon: FaTiktok },
  { label: 'YouTube', handle: '@seatonplace', href: 'https://youtube.com/@seatonplace', icon: FaYoutube },
  { label: 'Email', handle: 'seatonplaceband@gmail.com', href: 'mailto:seatonplaceband@gmail.com', icon: MdEmail },
]

export const YOUTUBE_URL = SOCIAL_LINKS.find((link) => link.label === 'YouTube')!.href

export function externalLinkProps(href: string) {
  return href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener noreferrer' }
}
