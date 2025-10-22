import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Edwin Torres - Senior Frontend Developer',
    short_name: 'Edwin Torres',
    description:
      'Senior Frontend Developer at HelloFresh, Software Architect, and advocate for ultralearning',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#f97316',
    icons: [
      {
        src: '/img/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/img/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
