import { getSession } from '@/lib/authFunctions';
import Link from 'next/link';

const NavBar = ({font}: {font: string}) => {
  const tokenContent = getSession();
  return (
    <nav className="flex items-center justify-end flex-wrap bg-white py-2 px-4 tracking-wider border-b border-gray-200">
      <div className="flex items-center flex-shrink-0 text-white mr-auto">
        <Link href="/">
          <span className="font-semibold text-3xl tracking-tight text-blue-violet">
            Valita
          </span>
        </Link>
      </div>
      <div className="hidden lg:flex lg:items-center lg:w-auto mr-10">
        <ul className="flex">
          <li className="mr-4">
            <Link
              href="/"
              className="block lg:inline-block lg:mt-0 text-slate-950 font-semibold p-3 hover:text-purple "
            >
              Trendaavat
            </Link>
          </li>
          <li className="mr-4">
            <Link
              href="/"
              className="block lg:inline-block lg:mt-0 text-slate-950 font-semibold p-3 hover:text-purple "
            >
              Uudet
            </Link>
          </li>
          <li className="mr-4">
            <Link
              href="/"
              className="block lg:inline-block lg:mt-0 text-slate-950 font-semibold p-3 hover:text-purple "
            >
              Parhaat
            </Link>
          </li>
        </ul>
      </div>
      <div className="lg:flex lg:items-center lg:w-auto">
        <ul className="flex">
          <li className="lg:mr-4">
            <Link
              href="/search"
              className="block lg:inline-block lg:mt-0 text-slate-950 font-semibold p-3 hover:text-purple "
            >
              Haku
            </Link>
          </li>
          {tokenContent && (
          <li className="lg:mr-4">
            <Link
              href="/create"
              className="block lg:inline-block lg:mt-0 text-slate-950 font-semibold p-3 hover:text-purple"
            >
              Luo julkaisu
            </Link>
          </li>
          )}
          <li className="lg:mr-4">
            <Link
              href="/register"
              className="block lg:inline-block lg:mt-0 text-slate-950 font-semibold p-3 hover:text-purple  "
            >
              Rekisteröidy
            </Link>
          </li>
          <li className="lg:mr-4">
            <Link
              href="/login"
              className="block lg:inline-block lg:mt-0 text-slate-950 font-semibold p-3 hover:text-purple  "
            >
              Kijaudu sisään
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
