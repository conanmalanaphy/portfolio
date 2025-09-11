'use client';

import { useState, useEffect, useCallback } from 'react';
import BlogCard from './blog-card';
import { BlogPostType } from '@/lib/schemas/blog-post-native';

interface BlogListProps {
  initialPosts?: BlogPostType[];
  tag?: string;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

/**
 * BlogList component displays a paginated list of blog posts
 */
export default function BlogList({ initialPosts = [], tag }: BlogListProps) {
  const [posts, setPosts] = useState<BlogPostType[]>(initialPosts);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });

  const fetchPosts = useCallback(async (page: number = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
      });
      
      if (tag) {
        params.append('tag', tag);
      }

      const response = await fetch(`/api/blogs?${params}`);
      const data = await response.json();

      if (response.ok) {
        setPosts(data.posts);
        setPagination(data.pagination);
      } else {
        console.error('Failed to fetch posts:', data.error);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  }, [pagination.limit, tag]);

  useEffect(() => {
    if (initialPosts.length === 0) {
      fetchPosts();
    }
  }, [tag, fetchPosts, initialPosts.length]);

  const handlePageChange = (newPage: number) => {
    fetchPosts(newPage);
  };

  if (loading && posts.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No blog posts found.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {pagination.pages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1 || loading}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            Previous
          </button>
          
          <span className="px-4 py-2 text-gray-600 dark:text-gray-400">
            Page {pagination.page} of {pagination.pages}
          </span>
          
          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.pages || loading}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
