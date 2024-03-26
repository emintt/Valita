import { fetchAllPost } from "@/models/postModels";

const PostList = async () => {
  const postList = await fetchAllPost();
  if (!postList) {
    <p>no post found</p>
  }
  return (
    <>
      <ul>
        {postList && (
          postList.map((post, index) => (
            <li key={index} className=' border-slate-950 p-2 mb-4'>
              {/* <h3>{post.company_name}</h3> */}
              <h4>{post.title}</h4>
              <p>{post.content}</p>
            </li>
        ))
        )}
      </ul>
    </>
  );
};

export default PostList;