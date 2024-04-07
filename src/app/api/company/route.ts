import { PostCompany } from "@/models/companyModels";
import { Calligraffitti } from "next/font/google";
import { NextRequest, NextResponse } from "next/server";
import { stringify } from "querystring";

export async function POST (request: NextRequest) {
  try {
    const data = await request.json();

    // send company name to company model to add and/or take back the company id 
    const postCompanyResult = await PostCompany(data.company_name);
    // console.log(postCompanyResult);

    if (!postCompanyResult) {
      return new NextResponse("posting company name error", {status: 500});
    }

    // return the the message with the company id
    return NextResponse.json((postCompanyResult), {status: 200});

  } catch (error) {
    console.error((error as Error).message, error);
    return new NextResponse((error as Error).message, { status: 500 });
  }
};  