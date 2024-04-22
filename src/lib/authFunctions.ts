import { TokenContent } from '@/types/DBTypes';
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export function getSession(): TokenContent | null {
  const session = cookies().get('session')?.value;
  console.log('session', session);
  if (!session) return null;
  const result = jwt.verify(session, process.env.JWT_SECRET as string) as TokenContent;
  console.log(result);
   return null;
}

export function updateSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  console.log('updatSession, session', session);
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = jwt.verify(
    session,
    process.env.JWT_SECRET as string,
  ) as TokenContent;
  console.log('parse', parsed);
  // 7 * 24 * 60 * 60 * 1000
  const expires = new Date(Date.now() + 604800000);
  const res = NextResponse.next();
  res.cookies.set({
    name: 'session',
    value: jwt.sign(parsed, process.env.JWT_SECRET as string, {
      expiresIn: '7d',
    }),
    httpOnly: true,
    expires: expires,
  });
  return res;
};


// If there is no session found, redirect to home page
export function requireAuth() {
  const session = getSession();
  if (!session?.user_id) {
    redirect('/');
  }
}
