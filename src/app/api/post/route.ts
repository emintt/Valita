import { requireAuth } from '@/lib/authFunctions';
import {postPost} from '@/models/postModels';
import {Post} from '@/types/DBTypes';
import {NextRequest, NextResponse} from 'next/server';
import {stringify} from 'querystring';

export async function POST(request: NextRequest) {
  requireAuth();
  try {
    // get the form data from the request
    const formData = await request.formData();

    // add post to database
    // get company_name, title, content from the form data
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

    const postData: Omit<Post, 'post_id' | 'created_at'> = {
      title: formData.get('title') as string,
      company_id: Number(formData.get('company_id') as string),
      content: formData.get('content') as string,
      filename: 'jbffjdbfcjknlj.kuva',
      filesize: 1634,
      media_type: 'image',
      user_id: 1,
    };
    await postPost(postData);
    return NextResponse.json(
      stringify({
        message: 'Post added to database',
      }),
    );
  } catch (error) {
    console.error((error as Error).message, error);
    return new NextResponse((error as Error).message, {status: 500});
  }
}

export async function GET(request: NextRequest) {

  
}
