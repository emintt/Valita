'use server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {cookies} from 'next/headers';
import {NextRequest, NextResponse} from 'next/server';
import {getUserByEmail} from '@/models/userModel';
import {TokenContent} from '@/types/DBTypes';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function login(formData: FormData) {
  // Verify credentials && get the user
  // Get the user DB by email from the form
  const user = await getUserByEmail(formData.get('email') as string);
  try {
    if (!user) {
      // throw new Error('Incorrect email or password');
      return {
        type: 'error',
        message: 'Virheellinen sähköpostiosoite tai salasana!',
      };
    }
    // console.log('user', user);
  
    // compare password
    const isPasswordCorrect = bcrypt.compareSync(
      formData.get('password') as string,
      user.password,
    );

    console.log('ispasswordcorrect', isPasswordCorrect);

    if (user.password && !isPasswordCorrect) {
      //throw new Error('Incorrect email or password');
      return {
        type: 'error',
        message: 'Virheellinen sähköpostiosoite tai salasana',
      };
    }

    if (!process.env.JWT_SECRET) {
      //throw new Error('JWT secret not set');
      return {
        type: 'error',
        message: 'Jotain meni pieleen',
      };
    }

    // Create token object
    const tokenContent: TokenContent = {
      user_id: user.user_id,
      level_name: user.level_name,
    };

    // Create the session
    // 7 * 24 * 60 * 60 * 1000 = 604800000 = 7 days
    const expires = Date.now() + 604800000;
    console.log('exp', expires);
    console.log('now', new Date(Date.now()));
    const session = jwt.sign(tokenContent, process.env.JWT_SECRET, {
      expiresIn: '7 days',
    });

    // Save the session in a cookie
    cookies().set('session', session, {expires, httpOnly: true});
   
  
  } catch (e) {
    console.error(e);
  } 

  revalidatePath('/');
  redirect('/');
}

export async function logout() {
  // Destroy the session
  cookies().set('session', '', {expires: new Date(0)});
  redirect('/');
}






