import { getPostWithCompanyNameAction } from "@/lib/postActions";
import { PostWithCompanyName } from "@/types/DBTypes";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";

export default async function PostPage({ params } : { params: { id: string }}) {
  console.log('postid', params.id);

  const post = await getPostWithCompanyNameAction(params.id) as PostWithCompanyName;
  console.log('post from page', post);
  return (
    <>
      <section className=' flex flex-col min-h-screen relative w-full xs:max-w-md md:max-w-[680px] '>
        <h1 className="text-2xl font-semibold text-left bg-white p-4 border rounded-lg border-slate-300 mb-1">Julkaisu</h1>
        {post &&
            <div className="mb-1 bg-white border rounded-lg border-slate-300">
              <div className=' p-4 sm:pl-8'>
                <p className=" text-slate-700 text-sm">{' ' + new Date(post.created_at).toLocaleString('fi-FI')}</p>
                <h3 className=' font-semibold text-lg pb-4 capitalize'>
                  <Link href={`/${post.post_id}`} >
                    {post.company_name}
                  </Link>
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
              

            </div>
          }
      </section>
    </>
  );
};