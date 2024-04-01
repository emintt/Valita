import {fetchCompanyById} from '@/models/companyModels';
import {fetchAllPost} from '@/models/postModels';
import {Post} from '@/types/DBTypes';

export const revalidate = 0;

const PostList = async () => {
  const postList = await fetchAllPost();
  if (!postList) {
    return <p>no post found</p>;
  }

  const postListWithCompanyName = await Promise.all(
    postList.map(async (post) => {
      const result = await fetchCompanyById(post.company_id);
      return {
        ...post,
        company_name: result?.company_name,
      };
    }),
  );

  return (
    <>
      <ul>
        {postListWithCompanyName &&
          postListWithCompanyName.map((post, index) => (
            <li key={index} className=" border-slate-950 p-2 mb-4">
              <h3>{post.company_name}</h3>
              <p>{new Date(post.created_at).toLocaleDateString('fi-FI')}</p>
              <h4>{post.title}</h4>
              <p>{post.content}</p>
            </li>
          ))}
      </ul>
    </>
  );
};

export default PostList;
