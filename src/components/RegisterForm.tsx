'use client';

import { doRegisterAction } from "@/lib/registerActions";

const RegisterForm = () => {



  return (
    <section className="shadow border border-gray-200 bg-white pt-6 pb-8 w-full xs:w-[415px] md:w-[500px] ">
      <h2 className=" text-2xl text-center font-black font-serif mb-6 mt-4">Rekisteröidy</h2>
      <div className=" p-8 flex flex-col rounded-lg  w-full sm:px-8 sm:py-4">
        <form action={doRegisterAction} className=' mt-1'>
          <div className="mt-3 mb-1">
            <label
              htmlFor="register-email"
              className="block text-gray-700 text-sm  font-bold mb-2 after:content-['*'] after:text-blue-violet"
            >
              Sähköpostiosoite:
            </label>
            <input
              type="text"
              name="email"
              id="register-email"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-8 focus:outline-none focus:border-blue-violet border-slate-300"
            />
          </div>
          <div className="mt-3 mb-1">
            <label
              htmlFor="resgister-password"
              className="block text-gray-700 text-sm  font-bold mb-2 after:content-['*'] after:text-blue-violet"
            >
              Salasana:
            </label>
            <input
              type="password"
              name="password"
              id="resgister-password"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-8 focus:outline-none focus:border-blue-violet border-slate-300"
            />
          </div>
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

export default RegisterForm;
