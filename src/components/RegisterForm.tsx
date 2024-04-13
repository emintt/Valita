'use client';

import { doRegisterAction } from "@/lib/registerActions";

const RegisterForm = () => {



  return (
    <>
      <form action={doRegisterAction}>
        <div className="mb-4">
          <label
            htmlFor="register-email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Sähköpostiosoite:
          </label>
          <input
            type="text"
            name="email"
            id="register-email"
            placeholder="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="resgister-password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Salasana:
          </label>
          <input
            type="password"
            name="password"
            id="resgister-password"
            placeholder="Password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Rekisteröidy
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
