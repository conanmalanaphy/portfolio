import Image from 'next/image';
import { BlogPostType } from '@/lib/schemas/blog-post-native';

interface BlogDetailProps {
  post: BlogPostType;
}

/**
 * BlogDetail component displays a full blog post
 */
export default function BlogDetail({ post }: BlogDetailProps) {
  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full dark:bg-blue-900 dark:text-blue-200"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          {post.title}
        </h1>
        
        <p className="text-xl text-gray-600 mb-6 dark:text-gray-300">
          {post.excerpt}
        </p>
        
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <time dateTime={post.publishedAt?.toString()}>
            Published on {post.publishedAt && formatDate(post.publishedAt)}
          </time>
        </div>
      </header>

      {post.featuredImage && (
        <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          />
        </div>
      )}

      <div className="prose prose-lg max-w-none dark:prose-invert">
        <div 
          className="text-gray-800 dark:text-gray-200 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      {post.images && post.images.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Gallery
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {post.images.map((imageUrl, index) => (
              <div key={index} className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
