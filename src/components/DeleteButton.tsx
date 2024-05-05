
'use client';

import { deletePostByIdAction } from "@/lib/postActions";


export default  function DeleteButton (props: {postId: number}) {
  // console.log('postid',props.postId);
  const postId = props.postId;

  const deletePost = async (postId: number) => {
  
    try {

      const deleteResponse = await deletePostByIdAction(postId);
      alert(deleteResponse?.message);
    } catch (e) {
      console.log('delete post error', (e as Error).message);
    }
  };
  return (
    <div className="self-end text-right pr-4 pt-4">
      <button 
        className="ml-4 w-18 text-red-500 hover:font-bold "
        onClick={() => {deletePost(props.postId)}}>
          Delete
      </button>
    </div>
  );
}
