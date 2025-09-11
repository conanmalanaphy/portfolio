import { MetadataRoute } from 'next';

/**
 * Robots.txt for blog section
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/blog/',
      disallow: '/admin/',
    },
    sitemap: 'https://malanaphy.co.uk/blog/sitemap.xml',
  };
}
