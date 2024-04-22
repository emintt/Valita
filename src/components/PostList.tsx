import { fetchCompanyById } from '@/models/companyModels';
import { fetchAllPost } from '@/models/postModels';

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
  postListWithCompanyName.reverse();

  return (
    <>
      <ul>
        {postListWithCompanyName &&
          postListWithCompanyName.map((post, index) => (
            <li key={index} className="border-slate-950 p-2 mb-4">
              <h3>
                <a href={`/${post.post_id}`} target="_self">
                  {post.company_name}
                </a>
              </h3>
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
