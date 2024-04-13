import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {cookies} from 'next/headers';
import {NextRequest, NextResponse} from 'next/server';
import {getUserByEmail} from '@/models/userModel';
import {TokenContent} from '@/types/DBTypes';

export async function login(formData: FormData) {
  // Verify credentials && get the user
  // Get the user DB by email from the form
  const user = await getUserByEmail(formData.get('email') as string);

  if (!user) {
    throw new Error('Incorrect email or password');
  }

  // compare password
  const isPasswordCorrect = bcrypt.compareSync(
    formData.get('password') as string,
    user.password,
  );

  if (user.password && !isPasswordCorrect) {
    throw new Error('Incorrect email or password');
  }

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT secret not set');
  }

  // Create token object
  const tokenContent: TokenContent = {
    user_id: user.user_id,
    level_name: user.level_name,
  };

  // Create the session
  const expires = new Date(Date.now() + 10 * 1000);
  const session = jwt.sign(tokenContent, process.env.JWT_SECRET, {
    expiresIn: '10 min',
  });

  // Save the session in a cookie
  cookies().set('session', session, {expires, httpOnly: true});
}

export async function logout() {
  // Destroy the session
  cookies().set('session', '', {expires: new Date(0)});
}

export function getSession(): TokenContent | null {
  const session = cookies().get('session')?.value;
  if (!session) return null;
  return jwt.verify(session, process.env.JWT_SECRET as string) as TokenContent;
}

export function updateSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = jwt.verify(
    session,
    process.env.JWT_SECRET as string,
  ) as TokenContent;
  const expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: 'session',
    value: jwt.sign(parsed, process.env.JWT_SECRET as string, {
      expiresIn: '10 min',
    }),
    httpOnly: true,
    expires: expires,
  });
  return res;
}
