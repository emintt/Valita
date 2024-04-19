'use client';
import {login} from '@/lib/authActions';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';


const initialState = {
  type: '',
  message: '',
}


export default  function LoginForm() {
  // const session = await getSession();

  const logoutHandler = async () => {
    // 'use server';
    // await logout();
    // redirect('/');
    console.log('');
  };
 
  //const [loginState, loginFormAction] = useFormState(login, initialState);
  const [serverResponse, setServerResponse] = useState<{
    type: string,
    message: string,
  }>(initialState);

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    reset,
  } = useForm<FieldValues>();

  // if all fields are validated, call server action to login
  const onSubmit = async (data: FieldValues) => {
    // create formdata and add the form content to it
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // call server action to do login
    const response = await login(formData);
    setServerResponse(response);
    reset();
  }

  return (
    <section className="shadow border border-gray-200 bg-white pt-6 pb-8 w-full xs:w-[415px] md:w-[500px] ">
      <h2 className=" text-2xl text-center font-black font-serif mb-6 mt-4">Kirjaudu sisään</h2>
      <div className=" p-8 flex flex-col rounded-lg  w-full sm:px-8 sm:py-4">
        {/* {!session ? ( */}
        {serverResponse?.message && <p className=' text-orange text-sm'>{serverResponse?.message}</p>}
        <form
          // action={loginFormAction}
          onSubmit={handleSubmit(onSubmit)}
          className=' mt-1 '
        >
          <div className="mt-3 mb-1">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm  font-bold mb-2 after:content-['*'] after:text-blue-violet"
            >
              Sähköpostiosoite:
            </label>
            <input
              {
                ...register("email", {
                  required:"Sähköposti vaaditaan",
                  pattern: {
                    value: /^.+@.+\..+$/,
                    message: "Täytyy olla kelvollinen sähköpostiosoite",
                  },
                })
              }
              type="text"
              name="email"
              id="email"
              placeholder=""
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-8 focus:outline-none focus:border-blue-violet border-slate-300 ${
                errors.email ? 'focus:border-orange' : ''
              }`} 
            />
          </div>
          {errors.email && (
              <p className=" text-orange-darker text-sm">{`${errors.email.message}`}</p>
            )}
          <div className=" mt-3 mb-1">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm  font-bold mb-2 after:content-['*'] after:text-blue-violet"
            >
              Salasana:
            </label>
            <input
              {
                ...register("password", {
                  required:"Salasana vaaditaan",
                  minLength: {
                    value: 5,
                    message: "Salasanan täytyy olla vähintään 5 merkkiä",
                  },
                  validate: (value) => (value.trim() < 5 ? "ei tyhjä" : true)
                
                })
              }
              type="password"
              name="password"
              id="password"
              placeholder=""
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-8 focus:outline-none focus:border-blue-violet border-slate-300 ${
                errors.email ? 'focus:border-orange' : ''
              }`} 
            />
          </div>
          {errors.password && (
              <p className=" text-orange-darker text-sm">{`${errors.password.message}`}</p>
            )}
          <button
            type="submit"
            className=" w-full mx-auto text-center bg-blue-violet hover:bg-blue-darker font-bold p-4 mt-6 rounded-lg text-xl focus:outline-none focus:shadow-outline"

          >
            Login
          </button>
        </form>
        {/* ) : ( */}
        
        {/* )} */}
      </div>
    </section>
  );
}
