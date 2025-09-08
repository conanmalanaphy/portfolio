import { MetadataRoute } from 'next'

/**
 * Web App Manifest for PWA support
 * Improves mobile experience and SEO
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Conan Malanaphy - Senior Front-end Developer',
    short_name: 'Conan Malanaphy',
    description: 'Senior Front-end Developer with 8+ years experience building award-winning software. Expert in React, Next.js, TypeScript.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    icons: [
      {
        src: '/icon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
    categories: ['portfolio', 'developer', 'technology'],
    lang: 'en-GB',
    orientation: 'portrait-primary',
  }
}
