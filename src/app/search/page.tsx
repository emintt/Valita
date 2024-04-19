import PostList from "@/components/PostList";
import SearchBox from "@/components/SearchBox";

export default function Search () {

  
  return (
    <>
      <div>
        <h2>Search bar (or search page) is comming</h2>
        <SearchBox/>
      </div>
      <div>
        <h2>Julkaisut</h2>
        <PostList />
      </div>
    </>
  );
};

