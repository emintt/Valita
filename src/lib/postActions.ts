'use server';

import { fetchPostWithCompanyNameById } from "@/models/postModels";
import { PostWithCompanyName } from "@/types/DBTypes";

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