'use client';

import { doRegisterAction } from "@/lib/registerActions";
import { User } from "@/types/DBTypes";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

const initialState = {
  type: '',
  message: '',
}


export default  function RegisterForm () {
  // Get response from server to set the state
  const [serverResponse, setServerResponse] = useState<{
    type: string,
    message: string,
  }>(initialState);

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    reset,
  } = useForm<Pick<User, "email" | "password">>({defaultValues: {
    email: '',
    password: ''
  }});

  const doRegister = async (data: Pick<User, "email" | "password">) => {

    // Create formdata and add the form content to it
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Call server action to do register
    const response = await doRegisterAction(formData);

    //  Set the server response to the state to capture any errors, if any.
    if (response) {
      setServerResponse(response);
      // reset the form
      reset();
    }
  };


  return (
    <section className="shadow border border-gray-200 bg-white pt-6 pb-8 w-full xs:w-[415px] md:w-[500px] ">
      <h2 className=" text-2xl text-center font-black font-serif mb-6 mt-4">Rekisteröidy</h2>
      <div className=" p-8 flex flex-col rounded-lg  w-full sm:px-8 sm:py-4">
      {serverResponse?.message && <p className=' text-orange text-sm'>{serverResponse?.message}</p>}
        <form onSubmit={handleSubmit(doRegister)} className=' mt-1'>
          <div className="mt-3 mb-1">
            <label
              htmlFor="register-email"
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
              id="register-email"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-8 focus:outline-none focus:border-blue-violet border-slate-300"

            />
          </div>
          {errors.email && (
              <p className=" text-orange-darker text-sm">{`${errors.email.message}`}</p>
            )}
          <div className="mt-3 mb-1">
            <label
              htmlFor="resgister-password"
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
                })
              }
              type="password"
              name="password"
              id="resgister-password"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-8 focus:outline-none focus:border-blue-violet border-slate-300"
            />
          </div>
          {errors.password && (
              <p className=" text-orange-darker text-sm">{`${errors.password.message}`}</p>
            )}
          <button
            type="submit"
            className=" w-full mx-auto text-center bg-blue-violet hover:bg-blue-darker font-bold p-4 mt-6 rounded-lg text-xl focus:outline-none focus:shadow-outline"
          >
            Rekisteröidy
          </button>
        </form>
      </div>
    </section>
  );
};

