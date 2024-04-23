'use client';

import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

const SearchBox = () => {
  const [searchFieldString, setSearchFieldString] = useState("");
  const router = useRouter();

 
  // Set the search string to state
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchFieldString(event.target.value.toLowerCase());    
  };

  // When the form is submitted, redirect to the search result page
  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('search field string at search box', searchFieldString);
    router.push(`/search?q=${searchFieldString}`);
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex justify-center w-2/3">
      <input
        value={searchFieldString}
        onChange={onChangeHandler}
        className="border rounded-lg w-full py-1 px-5 text-gray-800 focus:outline-none focus:border-blue-violet border-slate-300"
        type='search'
        placeholder='Hae yritys'
      />
      <ul>

      </ul>
    </form>
  );
};

export default SearchBox;