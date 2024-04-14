'use server';
import bcrypt from 'bcrypt';

const doRegisterAction = async (formData: FormData) => {
  const userData = Object.fromEntries(formData);
  // insert user to DB
  // try {
    const salt = bcrypt.genSaltSync(12);
    console.log(userData);

    userData.password = await bcrypt.hash(userData.password as string, salt);

    console.log(userData);

    // const newUser = await createUser(user);
    // console.log('newUser', newUser);
    // if (!newUser) {
    //   next(new CustomError('User not created', 500));
    //   return;
    // }
    // const response: UserResponse = {
    //   message: 'user created',
    //   user: newUser,
    // };
    // res.json(response);
  // } catch (error) {
    // next(new CustomError('Duplicate entry', 200));
  // }
  
}

export {doRegisterAction};