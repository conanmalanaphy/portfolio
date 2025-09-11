import { z } from 'zod';
import { ObjectId } from 'mongodb';

// Zod validation schema
export const BlogPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Invalid slug format'),
  excerpt: z.string().min(1, 'Excerpt is required').max(500, 'Excerpt too long'),
  content: z.string().min(1, 'Content is required'),
  featuredImage: z.string().url().optional(),
  images: z.array(z.string().url()).default([]),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(false),
  publishedAt: z.union([z.date(), z.string().transform(str => new Date(str))]).optional(),
  createdAt: z.union([z.date(), z.string().transform(str => new Date(str))]).optional(),
  updatedAt: z.union([z.date(), z.string().transform(str => new Date(str))]).optional(),
});

export type BlogPostType = z.infer<typeof BlogPostSchema>;

// MongoDB document interface
export interface BlogPostDocument extends BlogPostType {
  _id?: ObjectId;
}

// Database collection name
export const BLOG_POSTS_COLLECTION = 'blog_posts';

// Indexes for better performance
export const blogPostIndexes = [
  { key: { slug: 1 }, unique: true },
  { key: { published: 1, publishedAt: -1 } },
  { key: { tags: 1 } },
  { key: { createdAt: -1 } },
];
