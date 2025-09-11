'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import BlogEditor from '@/components/blog/blog-editor';
import { BlogPostDocument } from '@/lib/schemas/blog-post-native';

interface EditBlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Edit existing blog post page
 */
export default function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const router = useRouter();
  const [post, setPost] = useState<BlogPostDocument | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPost = useCallback(async () => {
    try {
      const { slug } = await params;
      const response = await fetch(`/api/blogs/${slug}?includeUnpublished=true`);
      if (response.ok) {
        const postData = await response.json();
        setPost(postData);
      } else {
        router.push('/admin/blog');
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      router.push('/admin/blog');
    } finally {
      setLoading(false);
    }
  }, [params, router]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const handleSave = async (data: BlogPostDocument) => {
    const { slug } = await params;
    const response = await fetch(`/api/blogs/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const updatedPost = await response.json();
      setPost(updatedPost);
      alert('Post updated successfully!');
    } else {
      const error = await response.json();
      alert(`Failed to update post: ${error.error}`);
    }
  };

  const handlePreview = async (data: BlogPostDocument) => {
    // Open preview in new tab
    const { slug } = await params;
    const previewData = encodeURIComponent(JSON.stringify(data));
    window.open(`/admin/blog/${slug}/preview?data=${previewData}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Post Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The blog post you&apos;re looking for doesn&apos;t exist.
          </p>
          <button
            onClick={() => router.push('/admin/blog')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Blog Management
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <BlogEditor
        initialData={post}
        onSave={handleSave}
        onPreview={handlePreview}
        isEditing={true}
      />
    </div>
  );
}
