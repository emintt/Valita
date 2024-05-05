import Image from 'next/image';
import NotFoundImage from '../../public/not-found.jpg';

export default function NotFound() {

  return (
    <>
      <section className=' flex flex-col items-center justify-center min-h-screen relative w-full bg-white '>
        <div className="flex flex-col justify-center shadow w-full xs:max-w-md md:max-w-[680px]">
        <Image 
          src={NotFoundImage}
          alt={'not found image'}
          width={1280}
          height={960}
          style={{contain: "cover", width:"auto", height:"100vh"}}
        />
        </div>    
        <h1 className=" text-xl uppercase font-serif font-semibold">Page not found</h1>
      </section>
    </>
  );
}
