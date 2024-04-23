import { getCompaniesBySearchParam } from "@/models/companyModels";
import { NextRequest, NextResponse } from "next/server";


// Search company by name
export async function GET(request: NextRequest) {
  // parse the query parameters from the URL of incoming request
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('q');

  if (!search) {
    return NextResponse.json({message: 'Search param is required', data: null}, {
      status: 400,
    });
  }

  // find companies in DB
  const companyResponse = await getCompaniesBySearchParam(search);
  console.log(
    'res at Search API', companyResponse
  );

  if (!companyResponse) {
    return NextResponse.json({message: 'No companies found', data: null}, {
      status: 200,
    });
  }

  return NextResponse.json({message: 'Companies found', data: companyResponse}, {
    status: 200,
  });

};
