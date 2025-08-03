import { NextRequest, NextResponse } from 'next/server';
import { getDropboxAccessToken } from '@/lib/dropbox';

export async function POST(req: NextRequest) {
  try {
    // Debug: Check if environment variables are loaded
    console.log('=== DROPBOX UPLOAD DEBUG ===');
    console.log('DROPBOX_APP_KEY exists:', !!process.env.DROPBOX_APP_KEY);
    console.log('DROPBOX_APP_SECRET exists:', !!process.env.DROPBOX_APP_SECRET);
    console.log('DROPBOX_REFRESH_TOKEN exists:', !!process.env.DROPBOX_REFRESH_TOKEN);

    // Check if required environment variables are missing
    if (!process.env.DROPBOX_APP_KEY || !process.env.DROPBOX_APP_SECRET || !process.env.DROPBOX_REFRESH_TOKEN) {
      console.error('Missing required Dropbox environment variables');
      return NextResponse.json({ 
        error: 'Dropbox configuration incomplete',
        details: 'Please check your .env.local file for DROPBOX_APP_KEY, DROPBOX_APP_SECRET, and DROPBOX_REFRESH_TOKEN'
      }, { status: 500 });
    }

    // Get fresh access token
    console.log('Getting fresh Dropbox access token...');
    const accessToken = await getDropboxAccessToken();
    console.log('Access token obtained successfully');

    console.log('Parsing form data...');
    const formData = await req.formData();
    console.log('Form data parsed successfully');

    const file = formData.get('file') as File;

    if (!file) {
      console.error('No file found in form data');
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    console.log('File received:', {
      name: file.name,
      size: file.size,
      type: file.type
    });

    // Check if it's a video file
    const videoTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/flv', 'video/webm', 'video/mkv'];
    if (!videoTypes.includes(file.type)) {
      console.error('Invalid file type:', file.type);
      return NextResponse.json({ error: 'Please upload a video file' }, { status: 400 });
    }

    console.log('Converting file to buffer...');
    const buffer = Buffer.from(await file.arrayBuffer());
    console.log('File buffer created, size:', buffer.length);

    // Create a unique filename with timestamp
    const timestamp = new Date().getTime();
    const fileName = `${timestamp}_${file.name}`;
    console.log('Uploading file as:', fileName);

    const dropboxArg = {
      path: `/uploads/${fileName}`,
      mode: 'add',
      autorename: true,
      mute: false
    };

    console.log('Dropbox API args:', dropboxArg);
    console.log('Making request to Dropbox API...');

    const response = await fetch('https://content.dropboxapi.com/2/files/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Dropbox-API-Arg': JSON.stringify(dropboxArg),
        'Content-Type': 'application/octet-stream'
      },
      body: buffer
    });

    console.log('Dropbox API response status:', response.status);
    console.log('Dropbox API response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      // Handle non-JSON error responses
      let errorData;
      try {
        errorData = await response.json();
        console.error('Dropbox API JSON error:', errorData);
      } catch (parseError) {
        const errorText = await response.text();
        console.error('Dropbox API text error:', errorText);
        errorData = { error: errorText };
      }
      
      return NextResponse.json({ 
        error: 'Failed to upload to Dropbox',
        details: errorData 
      }, { status: 500 });
    }

    const data = await response.json();
    console.log('Dropbox API success response:', data);
    
    return NextResponse.json({
      success: true,
      message: 'Video uploaded successfully to Dropbox',
      file: {
        name: fileName,
        size: file.size,
        type: file.type,
        dropboxPath: data.path_display
      }
    });

  } catch (error) {
    console.error('=== UPLOAD ERROR ===');
    console.error('Error type:', typeof error);
    console.error('Error message:', error instanceof Error ? error.message : error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 