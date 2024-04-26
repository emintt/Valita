
export default function Company({ params } : { params: { id: string }}) {
  console.log(params);
  return (
    <>
      <div className=" min-h-screen bg-white px-4 py-1 sm:px-8 relative border border-gray-300 pt-6 pb-8 w-full xs:max-w-md md:max-w-xl ">
        <h1 className="text-2xl font-semi font-serif uppercase">Company page</h1>
      </div>
      <section>
        <p></p>
      </section>
    </>
  );
};