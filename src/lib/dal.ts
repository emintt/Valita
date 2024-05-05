import 'server-only';
 
import { cookies } from 'next/headers'
import { cache } from 'react';
import { getSession } from './authFunctions';
import { redirect } from 'next/navigation';
 
export const verifySession = cache(async () => {
  const session = getSession();

 
  if (!session?.user_id) {
    redirect('/login')
  }
 
  return { isAuth: true, userId: session.user_id }
})