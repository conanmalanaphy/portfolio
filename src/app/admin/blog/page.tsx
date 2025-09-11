'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { BlogPostType } from '@/lib/schemas/blog-post-native';

/**
 * Admin blog management page
 */
export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blogs?published=false');
      const data = await response.json();
      
      if (response.ok) {
        setPosts(data.posts);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const response = await fetch(`/api/blogs/${slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPosts(posts.filter(post => post.slug !== slug));
      } else {
        alert('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    }
  };

  const togglePublished = async (post: BlogPostType) => {
    try {
      const response = await fetch(`/api/blogs/${post.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...post,
          published: !post.published,
        }),
      });

      if (response.ok) {
        setPosts(posts.map(p => 
          p.slug === post.slug 
            ? { ...p, published: !p.published }
            : p
        ));
      } else {
        alert('Failed to update post');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Blog Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Create, edit, and manage your blog posts
            </p>
          </div>
          <Link
            href="/admin/blog/new"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            Create New Post
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {posts.map((post) => (
                  <tr key={post.slug} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {post.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          /{post.slug}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => togglePublished(post)}
                        className={`px-2 py-1 text-xs rounded-full font-medium ${
                          post.published
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}
                      >
                        {post.published ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        {post.published && (
                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                            title="View Post"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        )}
                        <Link
                          href={`/admin/blog/${post.slug}/edit`}
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                          title="Edit Post"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.slug)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          title="Delete Post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No blog posts found.
            </p>
            <Link
              href="/admin/blog/new"
              className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create your first post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
