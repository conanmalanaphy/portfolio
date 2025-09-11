'use client';

import { useRouter } from 'next/navigation';
import BlogEditor from '@/components/blog/blog-editor';
import { BlogPostDocument } from '@/lib/schemas/blog-post-native';

/**
 * Create new blog post page with beautiful editor
 */
export default function NewBlogPostPage() {
  const router = useRouter();

  const handleSave = async (data: BlogPostDocument) => {
    const response = await fetch('/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const post = await response.json();
      router.push(`/admin/blog/${post.slug}/edit`);
    } else {
      const error = await response.json();
      alert(`Failed to create post: ${error.error}`);
    }
  };

  const handlePreview = () => {
    // For now, just show an alert. You could implement a preview modal or page
    alert('Preview functionality coming soon!');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <BlogEditor
        onSave={handleSave}
        onPreview={handlePreview}
        isEditing={false}
      />
    </div>
  );
}
