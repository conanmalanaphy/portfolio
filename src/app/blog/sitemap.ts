import { MetadataRoute } from 'next';
import clientPromise from '@/lib/mongodb';
import { BlogPostDocument, BLOG_POSTS_COLLECTION } from '@/lib/schemas/blog-post-native';

/**
 * Generate sitemap for blog posts
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const client = await clientPromise;
    const db = client?.db('portfolio');
    const collection = db?.collection<BlogPostDocument>(BLOG_POSTS_COLLECTION);

    // Get all published blog posts
    const posts = await collection?.find({ published: true }).toArray();

    // Generate sitemap entries for blog posts
    const blogEntries: MetadataRoute.Sitemap = posts?.map((post) => ({
      url: `https://malanaphy.co.uk/blog/${post.slug}`,
      lastModified: post.updatedAt || post.createdAt,
      changeFrequency: 'weekly',
      priority: 0.8,
    })) || [];

    // Add main blog page
    const mainBlogEntry: MetadataRoute.Sitemap = [{
      url: 'https://malanaphy.co.uk/blog',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    }];

    return [...mainBlogEntry, ...blogEntries];
  } catch (error) {
    console.error('Error generating blog sitemap:', error);
    return [{
      url: 'https://malanaphy.co.uk/blog',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    }];
  }
}
