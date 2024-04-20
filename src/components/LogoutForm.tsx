'use client';

import { logout } from "@/lib/authActions";

const initialState = {
  type: '',
  message: '',
}


export default function LogoutForm () {
  const logoutHandler = async () => {
    // call logout server action, redirect to home page
    await logout();
  };
  return (
    <>
      <form
          action={logout}
        >
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Logout
          </button>
        </form>
    </>
  );
}