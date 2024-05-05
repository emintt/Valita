import {PostCompany} from '@/models/companyModels';
import {NextRequest, NextResponse} from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // send company name to company model to add and to DB 
    // if it is already exists, take back the company id
    const postCompanyResult = await PostCompany(data.company_name);
    // console.log(postCompanyResult);

    if (!postCompanyResult) {
      return new NextResponse('posting company name error', {status: 500});
    }

    // return the the message with the company id
    return NextResponse.json(postCompanyResult, {status: 200});
  } catch (error) {
    console.error((error as Error).message, error);
    return new NextResponse((error as Error).message, {status: 500});
  }
}
