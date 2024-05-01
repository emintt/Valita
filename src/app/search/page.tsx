'use client';
import SearchBox from "@/components/SearchBox";
import { fetchData } from "@/lib/functions";
import { Company } from "@/types/DBTypes";
import { SearchResponse } from "@/types/MessageTypes";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { NextResponse } from "next/server";
import { useEffect, useState } from "react";

export default function Search () {
  const [result, setResult] = useState<SearchResponse>({message: '', data: null});
  
  // Get URLSearchParams object 
  const searchParams = useSearchParams();

  // Get value of 'q' query (ex. url:domain/search?q=AAA)
  const searchValue = searchParams ? searchParams.get('q') : null;
  // const encodedSearchValue = encodeURI(searchValue || '');

  // Fetch search result if search field string has a value
  useEffect(() => {
    if (searchValue) {
      const fetchSearchResults = async (searchString: string) => {
        try {          
          // send search string to Nextjs API end point /api/search
          const companyResult = await fetchData<Promise<SearchResponse>>('/api/search?q=' + searchString);
          setResult(companyResult);
          
        } catch (e) {
            console.error('Error fetching search result', e);
          }
      }
      fetchSearchResults(searchValue);
    }
  }, [searchValue]);  

  return (
    <div className=" min-h-screen rounded-xl bg-white p-4 sm:p-8 relative shadow border border-gray-200pt-6 pb-8 w-full xs:max-w-md md:max-w-xl ">
      <div>
        <SearchBox />
      </div>
      <div>
        <h2 className="text-3xl my-4 font-serif">Haku tulokset</h2>
        <ul>
        {result.data && (
          result.data.map((company) => {
            return (
              <div key={company.company_id} className=" flex p-1 gap-4 my-1 rounded-lg border hover:bg-[#F3EBFD] hover:transition-all hover:duration-300">
                <li data-cy="search-result" className=" text-md font-semibold w-full hover:ml-1 hover:transition-all hover:duration-300" >
                  <Link
                    href={`/company/${company.company_id}`}
                    className="block lg:inline-block lg:mt-0 text-slate-950 font-semibold p-3 "
                  >
                    {company.company_name}
                  </Link>
                </li>
              </div>
            );
          })
        )}
        </ul>
        {result.message === 'No companies found' && (
          <p>{result.message}</p>
        )}
      </div>
    </div>
  );
};

