'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import BlogDetail from '@/components/blog/blog-detail';
import { BlogPostDocument } from '@/lib/schemas/blog-post-native';

/**
 * Preview blog post page for admin
 */
export default function PreviewBlogPostPage() {
  const searchParams = useSearchParams();
  const [post, setPost] = useState<BlogPostDocument | null>(null);

  useEffect(() => {
    const data = searchParams.get('data');
    if (data) {
      try {
        const postData = JSON.parse(decodeURIComponent(data));
        setPost(postData);
      } catch (error) {
        console.error('Error parsing preview data:', error);
      }
    }
  }, [searchParams]);

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading preview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Preview Header */}
      <div className="bg-yellow-50 border-b border-yellow-200 p-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              <h1 className="text-lg font-semibold text-yellow-800">
                Preview Mode
              </h1>
              <span className="px-2 py-1 bg-yellow-200 text-yellow-800 text-sm rounded-full">
                {post.published ? 'Published' : 'Draft'}
              </span>
            </div>
            <button
              onClick={() => window.close()}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Close Preview
            </button>
          </div>
        </div>
      </div>

      {/* Blog Post Content */}
      <BlogDetail post={post} />
    </div>
  );
}
