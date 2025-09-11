import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { BlogPostDocument, BLOG_POSTS_COLLECTION } from '@/lib/schemas/blog-post-native';

/**
 * GET /api/blogs/[slug] - Fetch a single blog post by slug
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
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

    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const includeUnpublished = searchParams.get('includeUnpublished') === 'true';

    const query: { slug: string; published?: boolean } = { slug };
    if (!includeUnpublished) {
      query.published = true;
    }

    const post = await collection.findOne(query);

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/blogs/[slug] - Update a blog post
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
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

    const { slug } = await params;
    const body = await request.json();

    const updateData = {
      ...body,
      updatedAt: new Date(),
    };

    const result = await collection.findOneAndUpdate(
      { slug },
      { $set: updateData },
      { returnDocument: 'after' }
    );

    if (!result) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/blogs/[slug] - Delete a blog post
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
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

    const { slug } = await params;

    const result = await collection.findOneAndDelete({ slug });

    if (!result) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
