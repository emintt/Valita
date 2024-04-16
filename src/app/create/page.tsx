import PostForm from '@/components/PostForm';

const Page = () => {
  return (
    <div className=" shadow border border-gray-200 bg-white p-2 flex flex-col rounded-lg w-full md:w-[640px] sm:px-8 sm:py-4">
      <PostForm />
    </div>
  );
};

export default Page;
