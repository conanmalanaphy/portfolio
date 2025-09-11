import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

/**
 * Test endpoint to verify MongoDB connection
 */
export async function GET() {
  try {
    const client = await clientPromise;
    if (!client) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'MongoDB client is null',
          details: 'Failed to initialize MongoDB client'
        },
        { status: 500 }
      );
    }
    const db = client.db('portfolio');
    
    // Test the connection by pinging the database
    await db.admin().ping();
    
    return NextResponse.json({ 
      success: true, 
      message: 'MongoDB connection successful!',
      database: 'portfolio'
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'MongoDB connection failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
