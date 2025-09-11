import { z } from 'zod';
import { ObjectId } from 'mongodb';

// Zod validation schema
export const ImageSchema = z.object({
  filename: z.string().min(1, 'Filename is required'),
  url: z.string().url('Must be a valid URL'),
  alt: z.string().optional(),
  size: z.number().positive('Size must be positive'),
  mimeType: z.string().min(1, 'MIME type is required'),
  uploadedAt: z.date().default(() => new Date()),
});

export type ImageType = z.infer<typeof ImageSchema>;

// MongoDB document interface
export interface ImageDocument extends ImageType {
  _id?: ObjectId;
}

// Database collection name
export const IMAGES_COLLECTION = 'images';

// Indexes for better performance
export const imageIndexes = [
  { key: { filename: 1 } },
  { key: { uploadedAt: -1 } },
];
