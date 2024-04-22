'use client';

import { fetchData } from "@/lib/functions";
import { Company } from "@/types/DBTypes";
import { ChangeEvent, useState } from "react";

const SearchBox = () => {
  const [searchFieldString, setSearchFieldString] = useState("");

  const fetchSearchResults = async (searchString: string) => {
    // send search string to Nextjs API end point /api/search
    const companyResult = await fetchData<Company[] | null>('/api/search?q=' + searchString);
    console.log('companies', companyResult);
    return companyResult;
  }


  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchFieldString(event.target.value.toLowerCase());
    console.log('searchFileString', searchFieldString);
    // fetchSearchResults(searchFieldString);
      
  };


  const onSubmitHandler = () => {
    console.log(searchFieldString);
  }
  return (
    <form onSubmit={onSubmitHandler} className="flex justify-center w-2/3">
      <input
        value={searchFieldString}
        onChange={onChangeHandler}
        className="border rounded-lg w-full py-2 px-3 text-gray-800 focus:outline-none focus:border-blue-violet border-slate-300"
        type='search'
        placeholder='Hae yritys'
      />
      <ul>

      </ul>
    </form>
  );
};

export default SearchBox;