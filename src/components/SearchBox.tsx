'use client';

import { useState } from "react";


const SearchBox = () => {
  const [searchField, setSearchField] = useState('');
  const onchangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  
    console.log(searchField);
  };
  return (
    <input
      className="border rounded-lg w-full py-2 px-3 text-gray-800 focus:outline-none focus:border-blue-violet border-slate-300"
      type='search'
      placeholder='Hae julkaisua'
      onChange={onchangeHandler}
    />
  );
};

export default SearchBox;