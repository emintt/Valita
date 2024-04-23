'use client';
import SearchBox from "@/components/SearchBox";
import { fetchData } from "@/lib/functions";
import { Company } from "@/types/DBTypes";
import { SearchResponse } from "@/types/MessageTypes";
import { useSearchParams } from "next/navigation";
import { NextResponse } from "next/server";
import { useEffect, useState } from "react";

export default function Search () {
  const [result, setResult] = useState<SearchResponse>({message: '', data: null});
  
  // Get URLSearchParams object 
  const searchParams = useSearchParams();

  // Get value of 'q' query (ex. url:domain/search?q=AAA)
  const searchValue = searchParams ? searchParams.get('q') : null;
  const encodedSearchValue = encodeURI(searchValue || '');
  console.log('searchValue at page', searchValue);

  useEffect(() => {
    if (searchValue) {
      const fetchSearchResults = async (searchString: string) => {
        try {
          console.log('search string at page useeffect', searchString);
          
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
  
  console.log('result', result);
  console.log('result data', result.data);
  console.log('result message', result.message);

  return (
    <>
      <div>
        <SearchBox />
      </div>
      <div>
        <h2>Haku tulokset</h2>
        <ul>
        {result.data && (
          result.data.map((company) => {
            return (
              <li key={company.company_id}>{company.company_name}</li>
            );
          })
        )}
        </ul>
        {result.message === 'No companies found' && (
          <p>{result.message}</p>
        )}
      </div>
    </>
  );
};

