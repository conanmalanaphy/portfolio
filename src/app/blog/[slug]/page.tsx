import { notFound } from 'next/navigation';
import BlogDetail from '@/components/blog/blog-detail';
import StructuredData from '@/components/blog/structured-data';
import { BlogPostDocument, BLOG_POSTS_COLLECTION } from '@/lib/schemas/blog-post-native';
import clientPromise from '@/lib/mongodb';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Individual blog post page
 */
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const client = await clientPromise;
    if (!client) {
      notFound();
    }
    const db = client.db('portfolio');
    const collection = db.collection<BlogPostDocument>(BLOG_POSTS_COLLECTION);
    
    const { slug } = await params;
    const post = await collection.findOne({ 
      slug, 
      published: true 
    });

    if (!post) {
      notFound();
    }

    return (
      <main className="min-h-screen bg-white dark:bg-gray-900">
        <StructuredData post={post} slug={slug} />
        <BlogDetail post={post} />
      </main>
    );
  } catch (error) {
    console.error('Error fetching blog post:', error);
    notFound();
  }
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: BlogPostPageProps) {
  try {
    const client = await clientPromise;
    if (!client) {
      return {
        title: 'Blog Post',
      };
    }
    const db = client.db('portfolio');
    const collection = db.collection<BlogPostDocument>(BLOG_POSTS_COLLECTION);
    
    const { slug } = await params;
    const post = await collection.findOne({ 
      slug, 
      published: true 
    });

    if (!post) {
      return {
        title: 'Post Not Found',
      };
    }

    return {
      title: `${post.title} | Conan Malanaphy Blog`,
      description: post.excerpt,
      keywords: post.tags,
      authors: [{ name: 'Conan Malanaphy' }],
      creator: 'Conan Malanaphy',
      publisher: 'Conan Malanaphy',
      openGraph: {
        title: post.title,
        description: post.excerpt,
        url: `https://malanaphy.co.uk/blog/${slug}`,
        siteName: 'Conan Malanaphy Portfolio',
        locale: 'en_GB',
        type: 'article',
        publishedTime: post.publishedAt?.toISOString(),
        modifiedTime: post.updatedAt?.toISOString(),
        authors: ['Conan Malanaphy'],
        tags: post.tags,
        images: post.featuredImage ? [
          {
            url: post.featuredImage,
            width: 1200,
            height: 630,
            alt: post.title,
          }
        ] : [
          {
            url: 'https://malanaphy.co.uk/icon.png',
            width: 1200,
            height: 630,
            alt: post.title,
          }
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        creator: '@conanmalanaphy',
        images: post.featuredImage ? [post.featuredImage] : ['https://malanaphy.co.uk/icon.png'],
      },
      alternates: {
        canonical: `https://malanaphy.co.uk/blog/${slug}`,
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
  } catch {
    return {
      title: 'Blog Post',
    };
  }
}
