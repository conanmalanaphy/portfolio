import Link from 'next/link';
import Image from 'next/image';
import { BlogPostType } from '@/lib/schemas/blog-post-native';

interface BlogCardProps {
  post: BlogPostType;
}

/**
 * BlogCard component displays a preview of a blog post
 */
export default function BlogCard({ post }: BlogCardProps) {
  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 dark:bg-gray-800">
      <Link href={`/blog/${post.slug}`} className="block">
        {post.featuredImage && (
          <div className="relative h-48 w-full">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full dark:bg-blue-900 dark:text-blue-200"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
            {post.title}
          </h2>
          
          <p className="text-gray-600 mb-4 line-clamp-3 dark:text-gray-300">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <time dateTime={post.publishedAt?.toString()}>
              {post.publishedAt && formatDate(post.publishedAt)}
            </time>
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              Read more →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
