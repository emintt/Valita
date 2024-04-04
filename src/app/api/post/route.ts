import { postPost } from "@/models/postModels";
import { Post } from "@/types/DBTypes";
import { NextRequest, NextResponse } from "next/server";
import { stringify } from "querystring";


export async function POST(request: NextRequest) {
  try {
    // get the form data from the request
    const formData = await request.formData();
    // add post to database
    // get company_name, title, content from the form data
    if (!formData.get('title') || !formData.get('company_name') || !formData.get('content')) {
      return NextResponse.json('Title, company name and content is required', { status: 400 })
    }
    const postData: Omit<Post, 'post_id' | 'created_at'> = {
      title: formData.get('title') as string,
      company_id: 3, // TODO: haetaan comany id
      content: formData.get('content') as string,
      filename: 'jbffjdbfcjknlj.kuva',
      filesize: 1634,
      media_type: 'image',
      user_id: 1
    }
    await postPost(postData);
    return NextResponse.json(stringify( {
      message: 'Post added to database',
    }));
  } catch (error) {

  }
}