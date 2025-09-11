import Link from 'next/link';
import { Metadata } from 'next';
import BlogList from '@/components/blog/blog-list';

/**
 * Generate metadata for the blog page
 */
export const metadata: Metadata = {
  title: 'Blog | Conan Malanaphy - Senior Front-end Developer',
  description: 'Thoughts, insights, and experiences from my journey as a developer. Learn about React, Next.js, TypeScript, and modern web development.',
  keywords: ['blog', 'web development', 'React', 'Next.js', 'TypeScript', 'frontend', 'programming', 'tutorials'],
  authors: [{ name: 'Conan Malanaphy' }],
  creator: 'Conan Malanaphy',
  publisher: 'Conan Malanaphy',
  openGraph: {
    title: 'Blog | Conan Malanaphy - Senior Front-end Developer',
    description: 'Thoughts, insights, and experiences from my journey as a developer.',
    url: 'https://malanaphy.co.uk/blog',
    siteName: 'Conan Malanaphy Portfolio',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: 'https://malanaphy.co.uk/icon.png',
        width: 1200,
        height: 630,
        alt: 'Conan Malanaphy Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Conan Malanaphy - Senior Front-end Developer',
    description: 'Thoughts, insights, and experiences from my journey as a developer.',
    creator: '@conanmalanaphy',
    images: ['https://malanaphy.co.uk/icon.png'],
  },
  alternates: {
    canonical: 'https://malanaphy.co.uk/blog',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

/**
 * Blog page displaying all published blog posts
 */
export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-4">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              My Blog
            </h1>
            <Link
              href="/admin/blog/new"
              className="bg-gradient-to-br from-green-400 to-green-600 border-2 border-green-700 text-green-900 px-4 py-2 flex items-center gap-2 hover:from-green-500 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl font-mono font-bold text-sm"
              style={{ 
                imageRendering: 'pixelated',
                clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
                textShadow: '1px 1px 0px rgba(0,0,0,0.3)'
              }}
            >
              <div className="w-4 h-4 bg-green-800 flex items-center justify-center" 
                   style={{ 
                     imageRendering: 'pixelated',
                     clipPath: 'polygon(0 0, calc(100% - 2px) 0, 100% 2px, 100% 100%, 2px 100%, 0 calc(100% - 2px))'
                   }}>
                <div className="w-2 h-2 bg-green-200" 
                     style={{ 
                       imageRendering: 'pixelated',
                       clipPath: 'polygon(0 0, calc(100% - 1px) 0, 100% 1px, 100% 100%, 1px 100%, 0 calc(100% - 1px))'
                     }}></div>
              </div>
              WRITE POST
            </Link>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Thoughts, insights, and experiences from my journey as a developer
          </p>
        </header>
        
        <BlogList />
      </div>
    </main>
  );
}
