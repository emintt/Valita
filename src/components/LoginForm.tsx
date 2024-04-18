'use client';
import {redirect} from 'next/navigation';
import {getSession, login, logout} from '@/lib/authActions';
import { useFormState } from 'react-dom';


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
 
  const [loginState, loginFormAction] = useFormState(login, initialState);

  return (
    <section>
      <div className="flex flex-col p-8">
        {/* {!session ? ( */}
        {loginState?.message ? <p className=' text-orange'>{loginState?.message}</p> : <p></p>}
        <form
          action={loginFormAction}
          className=' mt-1'
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Sähköpostiosoite:
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Salasana:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </form>
        {/* ) : ( */}
        <form
          action={logoutHandler}
        >
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Logout
          </button>
        </form>
        {/* )} */}
      </div>
    </section>
  );
}
