'use server';

const doRegisterAction = async (formData: FormData) => {
  const user = Object.fromEntries(formData);
  console.log(user);
}

export {doRegisterAction};