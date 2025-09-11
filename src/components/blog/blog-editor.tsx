'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BlogPostSchema, BlogPostDocument } from '@/lib/schemas/blog-post-native';
import RichTextEditor from './rich-text-editor';
import ImageUpload from './image-upload';
import { Save, Eye, Plus, X, Tag } from 'lucide-react';
import Image from 'next/image';

interface BlogEditorProps {
  initialData?: BlogPostDocument;
  onSave: (data: BlogPostDocument) => Promise<void>;
  onPreview?: (data: BlogPostDocument) => void;
  isEditing?: boolean;
}

/**
 * Beautiful blog post editor with rich text editing capabilities
 */
export default function BlogEditor({ 
  initialData, 
  onSave, 
  onPreview, 
  isEditing = false 
}: BlogEditorProps) {
  const [saving, setSaving] = useState(false);
  const [featuredImage, setFeaturedImage] = useState<string>(initialData?.featuredImage || '');
  const [galleryImages, setGalleryImages] = useState<string[]>(initialData?.images || []);
  const [newTag, setNewTag] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useForm({
    resolver: zodResolver(BlogPostSchema),
    defaultValues: {
      title: initialData?.title || '',
      slug: initialData?.slug || '',
      excerpt: initialData?.excerpt || '',
      content: initialData?.content || '',
      tags: initialData?.tags || [],
      published: initialData?.published || false,
    },
  });

  watch('title'); // Watch title for slug generation
  const watchedTags = watch('tags') || [];

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setValue('title', title);
    setValue('slug', generateSlug(title));
  };

  const addTag = () => {
    if (newTag.trim() && !watchedTags.includes(newTag.trim())) {
      setValue('tags', [...watchedTags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue('tags', watchedTags.filter(tag => tag !== tagToRemove));
  };

  const addGalleryImage = (imageUrl: string) => {
    setGalleryImages([...galleryImages, imageUrl]);
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: BlogPostDocument) => {
    setSaving(true);
    try {
      const postData = {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        featuredImage: featuredImage || undefined,
        images: galleryImages,
        tags: data.tags || [],
        published: data.published || false,
        // Don't send date fields - they'll be handled by the server
      };

      await onSave(postData);
    } catch (error) {
      console.error('Error saving post:', error);
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    if (onPreview) {
      const data = getValues();
      const { publishedAt: _publishedAt, createdAt: _createdAt, updatedAt: _updatedAt, ...previewData } = data;
      onPreview({
        ...previewData,
        tags: data.tags || [],
        published: data.published || false,
        featuredImage,
        images: galleryImages,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">
            {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h1>
          <p className="text-blue-100">
            {isEditing ? 'Update your blog post content and settings' : 'Share your thoughts with the world'}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-8">
          {/* Title and Slug */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Title *
              </label>
              <input
                {...register('title')}
                onChange={handleTitleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-lg"
                placeholder="Enter an engaging title for your blog post"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                URL Slug *
              </label>
              <input
                {...register('slug')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="url-friendly-slug"
              />
              {errors.slug && (
                <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
              )}
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Excerpt *
            </label>
            <textarea
              {...register('excerpt')}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Write a brief, compelling description of your post that will appear in previews and search results"
            />
            {errors.excerpt && (
              <p className="text-red-500 text-sm mt-1">{errors.excerpt.message}</p>
            )}
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Featured Image
            </label>
            <ImageUpload
              onImageUploaded={setFeaturedImage}
              onRemove={() => setFeaturedImage('')}
              existingImage={featuredImage}
              className="h-48"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              This image will be displayed at the top of your blog post and in previews
            </p>
          </div>

          {/* Content Editor */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Content *
            </label>
            <RichTextEditor
              content={watch('content')}
              onChange={(content) => setValue('content', content)}
              placeholder="Start writing your blog post content here. Use the toolbar above to format your text, add headings, lists, links, and images."
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
            )}
          </div>

          {/* Gallery Images */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Gallery Images
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
              {galleryImages.map((imageUrl, index) => (
                <div key={index} className="relative group">
                  <Image
                    src={imageUrl}
                    alt={`Gallery image ${index + 1}`}
                    width={96}
                    height={96}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
            <ImageUpload
              onImageUploaded={addGalleryImage}
              className="h-32"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Add additional images to create a gallery at the end of your post
            </p>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {watchedTags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full flex items-center gap-2 dark:bg-blue-900 dark:text-blue-200"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-blue-600 hover:text-blue-800 ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
          </div>

          {/* Publish Settings */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Publish Settings
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Control when and how your post is published
                </p>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    {...register('published')}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Publish immediately
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-600">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              {saving ? 'Saving...' : (isEditing ? 'Update Post' : 'Create Post')}
            </button>
            
            {onPreview && (
              <button
                type="button"
                onClick={handlePreview}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <Eye className="w-5 h-5" />
                Preview
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
