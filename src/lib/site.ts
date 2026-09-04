/** Informations de l'organisation et navigation, centralisées pour tout le site. */
export const SITE = {
  name: 'ONG Green-Chad',
  shortName: 'Green-Chad',
  tagline: 'Pour un développement durable au Tchad',
  description:
    "Outiller les citoyens tchadiens pour leur permettre de relever efficacement le défi du développement durable et protéger l'environnement.",
  url: (process.env.NEXT_PUBLIC_SERVER_URL || 'https://www.greenchad.com').replace(/\/$/, ''),
  email: 'greenchad2010@gmail.com',
  phones: ['+235 66 28 67 31', '+235 92 32 00 39'],
  address: "Quartier Repos 2, en face du Lycée de la Liberté, N'Djamena, Tchad",
  addressShort: 'Repos 2, N’Djamena',
  recognition: 'ONG nationale reconnue · N°0036/2025',
  decree: 'Arrêté N°136 du 17/07/2025',
  since: 2023,
  socials: {
    facebook: 'https://www.facebook.com/ONGGreenchad/',
    tiktok: 'https://www.tiktok.com/@green_chad',
    linkedin: 'https://www.linkedin.com/in/ong-green-chad-a0952431/',
  },
} as const

export const NAV_LINKS = [
  { label: 'Accueil', href: '/' },
  { label: 'À propos', href: '/#about' },
  { label: 'Nos activités', href: '/#activities' },
  { label: 'Blog', href: '/blog' },
  { label: 'Documents', href: '/documents' },
  { label: 'Contact', href: '/#contact' },
] as const

export const telHref = (phone: string) => `tel:${phone.replace(/\s+/g, '')}`
