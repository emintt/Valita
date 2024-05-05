import { getSession, requireAuth } from '@/lib/authFunctions';
import { fetchData } from '@/lib/functions';
import {postPost} from '@/models/postModels';
import { Post, TokenContent } from '@/types/DBTypes';
import { UploadResponse } from '@/types/MessageTypes';
import { cookies } from 'next/headers';
import {NextRequest, NextResponse} from 'next/server';
import {stringify} from 'querystring';

export async function POST(request: NextRequest) {
  requireAuth();

  try {
    const tokenContent = getSession();
    if (!tokenContent) {
      return NextResponse.json('Invalid user');
    }
    // Get the form data from the request
    const formData = await request.formData();

    // Add post to database
    // Get company_name, title, content from the form data
    if (
      !formData.get('title') ||
      !formData.get('company_name') ||
      !formData.get('content')
    ) {
      return NextResponse.json('Title, company name and content is required', {
        status: 400,
      });
    }

    if (!formData.get('company_id')) {
      return NextResponse.json('Can not create company');
    }

    let uploadResult: UploadResponse = {
      message: '',
      data: {
          filename: '',
          media_type: '',
          filesize: 0,
      },
    }

    // If formData has file, post it to upload server
    console.log('formdata file', formData.get('file'), typeof(formData.get('file')));
    if (formData.get('file') && formData.get('file') !== 'undefined') {
      // console.log('form data file', formData.get('file'));
      // Get the token from the cookie
      const token = cookies().get("session")?.value;

      uploadResult = await fetchData<UploadResponse>(
        (process.env.UPLOAD_SERVER as string) + '/upload',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );
      
      // console.log('file upload result', uploadResult);

      // If the upload response is valid, add the image to the database
      if (!uploadResult.data) {
        return new NextResponse('Error uploading post', {status: 500});
      }
    }

    
    // Create post data object to save to DB
    const postData: Omit<Post, 'post_id' | 'created_at'> = {
      title: formData.get('title') as string,
      company_id: Number(formData.get('company_id') as string),
      content: formData.get('content') as string,
      filename: uploadResult.data.filename || null,
      filesize: uploadResult.data.filesize || null,
      media_type: uploadResult.data.media_type || null,
      user_id: tokenContent.user_id,
    };

    // Insert to DB
    const postResult = await postPost(postData);
    
    if (!postResult) {
      return new NextResponse('Error adding post to DB', {status: 500});
    }
    
    return NextResponse.json(
      stringify({
        message: 'Post added to database',
      }),
    );
  } catch (error) {
    console.error((error as Error).cause, (error as Error).stack, (error as Error).message, (error as Error).name);
    return NextResponse.json('Error creating post', {status: 500});
  }
}



