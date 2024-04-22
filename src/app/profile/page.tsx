import LogoutForm from "@/components/LogoutForm";
import { getSession, requireAuth } from "@/lib/authFunctions";

export default function Profile () {
  requireAuth();
  // Get user info (id, level) from session
  const user = getSession();
  return (
    <>
      <div className=" bg-white p-4 relative shadow border border-gray-200pt-6 pb-8 w-full xs:w-[415px] md:w-[500px] ">
        <h2 className="text-3xl my-4">Profiili</h2>
        {user && (
          <div className="">
            <div><h3>Tervetuloa!</h3>
              {/* <p>Käyttäjänimi: {user.username}</p>
              <p>Sähköposti: {user.email}</p>
              <p>Luotu: {new Date(user.created_at).toLocaleDateString('fi-FI')}</p> */}
            </div>
            <div className=" absolute top-8  right-4">
              <LogoutForm />
            </div>
          </div>
        )}
      </div>
      <div className=" h-96">

      </div>
    </>
  );
};

