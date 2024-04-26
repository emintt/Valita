import PostForm from '@/components/PostForm';
import { requireAuth } from '@/lib/authFunctions';

export default function Page () {
  requireAuth();
  return (
    <div className="shadow border border-gray-200 bg-white pt-6 pb-8 w-full xs:w-[415px] md:w-[500px] ">
      <PostForm />
    </div>
  );
};

