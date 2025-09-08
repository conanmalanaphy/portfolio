import { MetadataRoute } from 'next'

/**
 * Robots.txt for SEO optimization
 * Tells search engines how to crawl the site
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://conanmalanaphy.dev/sitemap.xml',
  }
}
