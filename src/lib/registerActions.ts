'use server';
import { createUser } from '@/models/userModel';
import { User } from '@/types/DBTypes';
import bcrypt from 'bcrypt';

const doRegisterAction = async (formData: FormData) => {
  const userData = Object.fromEntries(formData) as Pick<User, "password" | "email">;
  // insert user to DB
  
  const salt = bcrypt.genSaltSync(12);
  console.log(userData);

  userData.password = await bcrypt.hash(userData.password as string, salt);

  console.log(userData);

  const newUser = await createUser(userData);
  console.log('newUser', newUser);
  if (!newUser) {
    throw new Error('User not created');
  }
  // const response: UserResponse = {
  //   message: 'user created',
  //   user: newUser,
  // };
  // res.json(response);

    
  

}

export {doRegisterAction};