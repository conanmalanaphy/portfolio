import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { BlogPostSchema, BlogPostDocument, BLOG_POSTS_COLLECTION } from '@/lib/schemas/blog-post-native';

/**
 * GET /api/blogs - Fetch all published blog posts
 */
export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    if (!client) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }
    const db = client.db('portfolio');
    const collection = db.collection<BlogPostDocument>(BLOG_POSTS_COLLECTION);

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const tag = searchParams.get('tag');
    const published = searchParams.get('published') !== 'false'; // Default to true

    const query: { published?: boolean; tags?: { $in: string[] } } = {};
    if (published) {
      query.published = true;
    }
    if (tag) {
      query.tags = { $in: [tag] };
    }

    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      collection
        .find(query, { projection: { content: 0 } }) // Exclude content for listing
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      collection.countDocuments(query),
    ]);

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/blogs - Create a new blog post
 */
export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    if (!client) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }
    const db = client.db('portfolio');
    const collection = db.collection<BlogPostDocument>(BLOG_POSTS_COLLECTION);

    const body = await request.json();
    
    // Validate input with Zod
    const validatedData = BlogPostSchema.parse(body);

    // Check if slug already exists
    const existingPost = await collection.findOne({ slug: validatedData.slug });
    if (existingPost) {
      return NextResponse.json(
        { error: 'A blog post with this slug already exists' },
        { status: 400 }
      );
    }

    const postData: BlogPostDocument = {
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(postData);
    const post = await collection.findOne({ _id: result.insertedId });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
