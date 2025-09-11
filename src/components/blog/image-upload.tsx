'use client';

import { useState, useRef } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  onImageUploaded: (imageUrl: string) => void;
  onRemove?: () => void;
  existingImage?: string;
  className?: string;
}

/**
 * ImageUpload component for uploading images to Vercel Blob Storage
 */
export default function ImageUpload({ 
  onImageUploaded, 
  onRemove, 
  existingImage,
  className = '' 
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('alt', file.name);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        onImageUploaded(data.image.url);
        
        // Show info message if using placeholder
        if (data.image.url.includes('placeholder.com')) {
          alert('Image upload is using placeholder. To enable real image uploads, please configure Vercel Blob Storage in your environment variables.');
        }
      } else {
        alert(`Upload failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  if (existingImage) {
    return (
      <div className={`relative group ${className}`}>
        <div className="relative h-48 w-full rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
          <Image
            src={existingImage}
            alt="Uploaded image"
            width={400}
            height={192}
            className="w-full h-full object-cover"
          />
          {onRemove && (
            <button
              onClick={onRemove}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
relative h-48 w-full border-2 border-dashed rounded-lg cursor-pointer
transition-colors duration-200
        ${dragOver 
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
        }
        ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={uploading}
      />
      
      <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
        {uploading ? (
          <>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
            <p className="text-sm">Uploading...</p>
          </>
        ) : (
          <>
            <ImageIcon className="w-12 h-12 mb-2" />
            <p className="text-sm font-medium mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-xs">
              PNG, JPG, WebP, GIF up to 10MB
            </p>
          </>
        )}
      </div>
    </div>
  );
}
