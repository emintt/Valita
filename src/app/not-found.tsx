import Image from 'next/image';
import NotFoundImage from '../../public/not-found.jpg';

export default function NotFound() {

  return (
    <>
      <section className=' flex flex-col min-h-screen relative shadow w-full xs:max-w-md md:max-w-[680px] '>
        <Image 
          src={NotFoundImage}
          alt={'not found image'}
          width={960}
          height={960}
          style={{contain: "cover", width:"100%", height:"auto"}}
        />
        <h1 className=" text-lg">Page not found</h1>
      </section>
    </>
  );
}
