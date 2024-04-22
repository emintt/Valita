import { getCompaniesBySearchParam } from "@/models/companyModels";
import { Company } from "@/types/DBTypes";
import { NextRequest, NextResponse } from "next/server";

// Search company by name
export async function GET(request: NextRequest): Promise<Company[] | null> {
  // parse the query parameters from the URL of incoming request
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('q');

  if (!search) {
    return NextResponse.json('Search param is required', {
      status: 400,
    });
  }

  // find companies
  const companyResponse = await getCompaniesBySearchParam(search);
  console.log(
    'res', companyResponse
  );

  if (!companyResponse) {
    return NextResponse.json('No companies found', {
      status: 200,
    });
  }

  return NextResponse.json({companyResponse});

};
