import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import clientPromise from '@/lib/mongodb';
import { ImageSchema, ImageDocument, IMAGES_COLLECTION } from '@/lib/schemas/image-native';

/**
 * POST /api/upload - Upload an image to Vercel Blob Storage
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const alt = formData.get('alt') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const extension = file.name.split('.').pop();
    const filename = `${timestamp}-${Math.random().toString(36).substring(2)}.${extension}`;

    // Upload to Vercel Blob
    let blob;
    try {
      blob = await put(filename, file, {
        access: 'public',
      });
    } catch (error) {
      // Fallback: return a placeholder URL if Blob storage is not configured
      if (error instanceof Error && error.message.includes('No token found')) {
        return NextResponse.json({
          success: true,
          image: {
            id: 'placeholder',
            url: 'https://via.placeholder.com/400x300?text=Image+Upload+Disabled',
            filename: file.name,
            alt: alt || file.name,
            size: file.size,
            mimeType: file.type,
          },
        });
      }
      throw error;
    }

    // Save image metadata to MongoDB
    const client = await clientPromise;
    if (!client) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }
    const db = client?.db('portfolio');
    const collection = db.collection<ImageDocument>(IMAGES_COLLECTION);
    
    const imageData = {
      filename: file.name,
      url: blob.url,
      alt: alt || file.name,
      size: file.size,
      mimeType: file.type,
      uploadedAt: new Date(),
    };

    const validatedData = ImageSchema.parse(imageData);
    const result = await collection.insertOne(validatedData);
    const image = await collection.findOne({ _id: result.insertedId });

      return NextResponse.json({
        success: true,
        image: {
          id: image?._id,
          url: blob.url,
          filename: file.name,
          alt: alt || file.name,
          size: file.size,
          mimeType: file.type,
        },
      });
  } catch (error) {
    console.error('Error uploading image:', error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/upload - Get all uploaded images
 */
export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client?.db('portfolio');
    const collection = db?.collection<ImageDocument>(IMAGES_COLLECTION);

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const skip = (page - 1) * limit;

    const [images, total] = await Promise.all([
      collection?.find()
        .sort({ uploadedAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      collection?.countDocuments(),
    ]);

    return NextResponse.json({
      images,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total || 0 / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}
