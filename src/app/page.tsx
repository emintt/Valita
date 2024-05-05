import PostList from '@/components/PostList';
import Image from 'next/image';
// export const revalidate = 0;

export default function Home() {
  
  return (
    <>
      <section className=' flex flex-col min-h-screen relative shadow w-full xs:max-w-md md:max-w-[680px] '>
        <h1 className="text-2xl font-semibold text-left bg-white p-4 border rounded-lg border-slate-300 mb-1">Julkaisut</h1>
        <PostList />
      </section>
    </>
  );
}
