'use client'

import { fetchData } from "@/lib/functions";
import { useRouter } from "next/navigation";



const PostForm =  () => {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // create form data and add the form content to it
      const formData = new FormData(e.currentTarget);
      // send the form data to Next.js API endpoint /api/post
      const options: RequestInit = {
          method: 'POST',
          body: formData,    
        };
      await fetchData('/api/post', options);
      
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="company_name"
          >
            <span className="hidden">Company name</span>
            <input
              type="text"
              name="company_name"
              id="company_name"
              className="shadow border rounded w-full py-2 px-3 text-gray-800 focus:outline-none focus:shadow-outline"
              placeholder="Yrityksen nimi"
            />
          </label>
        </div>
        <div className="mb-4">
          <label
            htmlFor="title"
          >
            <span className="hidden">Title</span>
            <input
              type="text"
              name="title"
              id="title"
              className="shadow border rounded w-full py-2 px-3 text-gray-800 focus:outline-none focus:shadow-outline"
              placeholder="Otsikko"
            />
          </label>
        </div>  
        <div className="mb-4">
          <label
            htmlFor="content"
          >
            <span className="hidden">Content</span>
            <textarea
              cols={30}
              rows= {5}
              name="content"
              id="content"
              className="shadow border rounded w-full py-2 px-3 text-gray-800 focus:outline-none focus:shadow-outline"
              placeholder="Mitä mietit?"
            ></textarea>          
          </label>
        </div>
        <div>
          <input type="submit" value="Luo julkaisu" />
        </div>
      </form>
    </div>
  );
};

export default PostForm;
