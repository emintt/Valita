import CompanyPostList from "@/components/CompanyPostLits";

export default function Company({ params } : { params: { id: number }}) {
  console.log(params);
  return (
    <>
      <section className=' flex flex-col min-h-screen relative w-full xs:max-w-md md:max-w-[680px] '>
        <h1 className="text-2xl font-semibold text-left bg-white p-4 border rounded-lg border-slate-300 mb-1">Yrityksen Julkaisut</h1>
        <CompanyPostList id={params.id} />
      </section>
    </>
  );
};