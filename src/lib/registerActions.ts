'use server';
import { checkEmailExists, createUser } from '@/models/userModel';
import { User } from '@/types/DBTypes';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function doRegisterAction (data: FormData) {
  try {

    if (!data.get('email') || !data.get('password')) {
      return {
        type: 'error',
        message: 'Rekisteröinti epäonnistui',
      }
    }
    // Get user data from the form
    const userData = {
      email: data.get('email') as string,
      password: data.get('password') as string
    }

    // Check if the email exists 
    const result = await checkEmailExists(userData.email);
    // console.log('result', result);

    if (!result.available) {
      return {
        type: 'error',
        message: 'Virheellinen tai jo olemassa oleva sähköpostiosoite.',
      };
    }

    const salt = bcrypt.genSaltSync(12);

    // Change password to a hashed one
    userData.password = await bcrypt.hash(userData.password, salt);

    // Insert user to DB
    const newUser = await createUser(userData);
    // console.log('newUser', newUser);

    if (!newUser) {
      return {
        type: 'error',
        message: 'Käyttäjää ei ole luotu',
      };
    }

  } catch (e) {
    console.error(e);
  }
  
  redirect('/login');

};

