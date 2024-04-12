import PostForm from "@/components/PostForm";

const Page = () => {
  return (
    <div className=" shadow border border-gray-200 bg-white p-2 flex flex-col rounded-lg w-full md:w-[740px]">
      <h2 className=" text-2xl text-center font-black font-serif mb-6 mt-4">Luo julkaisu</h2>
      <PostForm />
    </div>
  );
};

export default Page;
