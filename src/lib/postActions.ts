'use server';
import { getSession, requireAuth } from '@/lib/authFunctions';

import { deletePost, fetchPostWithCompanyNameById } from "@/models/postModels";
import { getUserById } from '@/models/userModel';
import { PostWithCompanyName } from "@/types/DBTypes";
import { revalidatePath } from 'next/cache';

export async function getPostWithCompanyNameAction(id: string) {
  try { 
    // console.log('id from server action', id);
    if (!id) {
      return {
        type: 'error',
        message: 'Invalid id parameter',
      }
    }

    // Get post from DB
    const post = await fetchPostWithCompanyNameById(id);

    
    if (!post) {
      return {
        type: 'error',
        message: 'Error fetching post',
      };
    }

    return post;
  } catch (e) {
    console.error(e);
  }
};

export async function deletePostByIdAction (id: number) {
  console.log('hello from delete actions', id);
  // check session 
  requireAuth();
  
  try { 
    // console.log('id from server action', id);
    if (!id) {
      return {
        type: 'error',
        message: 'Invalid id parameter',
      }
    }

    const session = getSession();
    if (!session) {
      return;
    }

    // Get user by id
    const user = await getUserById(session.user_id);
    if (!user) {
      return {
        type: 'error',
        message: 'Error fetching user',
      };
    }

    // delete post from DB
    const deleteResult = await deletePost(id, user.user_id, user.level_name);

    
    if (deleteResult.message === 'Post not deleted') {
      return {
        type: 'error',
        message: 'Error deleting post',
      };
    }

    if (deleteResult.message === 'Post deleted') {
      revalidatePath('/');
      return {
        type: 'success',
        message: 'Post deleted successfully',
      };
    }

  } catch (e) {
    console.error(e);
  }
  
    
}