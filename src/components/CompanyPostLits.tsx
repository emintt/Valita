import { fetchCompanyById } from '@/models/companyModels';
import { fetchAllPost, fetchCompanyPosts } from '@/models/postModels';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import DeleteButton from './DeleteButton';
import { getSession } from '@/lib/authFunctions';



const CompanyPostList = async (props : {id: number}) => {
  const postList = await fetchCompanyPosts(props.id);
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

  const token = getSession();
  console.log(token);

  return (
    <>
      <ul>
        {postListWithCompanyName &&
          postListWithCompanyName.map((post, index) => (
            <li key={index} className="mb-1 bg-white border rounded-lg border-slate-300">
              {token && ((token.level_name === "Admin") || (token.user_id === post.user_id)) 
                && <DeleteButton postId={post.post_id} />}

              <Link href={`/chain/${post.post_id}`} target="_self">
                <div className=' p-4 sm:pl-8'>
                  <p className=" text-slate-700 text-sm">{' ' + new Date(post.created_at).toLocaleString('fi-FI')}</p>
                  <h3 className=' font-semibold text-lg pb-4 capitalize'>
                      {post.company_name}
                  </h3>
                  <h4 className=" font-semibold capitalize">{post.title}</h4>
                  <p className=" py-1">{post.content}</p>
                
                {post.filename && (
                  // <Image src={post.filename} alt="post image" width="400" height="200"></Image>
                  <div>
                    <Image 
                      src={`${process.env.UPLOAD_URL}${post.filename}`} 
                      alt="post image"
                      width={680}
                      height={425}
                      style={{objectFit: "cover", width: "100%", height: "425px"}}
                      priority={true}
                      className=' border rounded-lg border-slate-300'
                      />
                  </div>
                )}
                </div>
                              
                {/* <div className=" py-2 border-t px-4 sm:pl-8 flex justify-end items-center">
                  
                  <FaRegComment className=' inline-block' size={18} color={"blue"}  fill={"blue"}/>{' '}
                  <span>1</span>
                </div> */}
              

              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default CompanyPostList;
