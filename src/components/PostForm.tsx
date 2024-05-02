'use client';
import { fetchData } from '@/lib/functions';
import { CompanyResponse, MessageResponse } from '@/types/MessageTypes';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import basePath from "../../next.config.mjs"


type PostFormField = {
  company_name: string;
  title: string;
  content: string;
  file?: FileList | undefined | File;
};

const PostForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    reset,
    getValues,
  } = useForm<PostFormField>();

  const onSubmit = async (data: PostFormField) => {
    // console.log('data', data);
    // (data.file return a file list object)
    if (data.file) {
      const file = (data.file as FileList)[0];
      data.file = file;
    }
    try {
      // create form data and add the form content to it
      const formData = new FormData();

      formData.append("company_name", data.company_name);
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("file", data.file as File);

      // post company name to database
      const companyData = {
        company_name: data.company_name,
      };
      // send company name to Nextjs API end point /api/company
      const companyResult = await fetchData<CompanyResponse>('/api/company', {
        method: 'POST',
        body: JSON.stringify(companyData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!companyResult) {
        throw new Error('Error posting company name');
      }

      formData.append('company_id', String(companyResult.company_id));
      // console.log(formData.get('company_id'));

      // send the form data to Next.js API endpoint /api/post
      const options: RequestInit = {
        method: 'POST',
        body: formData,
      };
      const result = await fetchData<MessageResponse>('/api/post', options);
      console.log(result);

      router.push('/');
      router.refresh();
    } catch (error) {
      console.error(error);
    }
    // reset();
  };

  return (
    <>
      <h2 className=" text-2xl text-center font-black font-serif mb-6 mt-4">Luo julkaisu</h2>
      <div className=" p-8 flex flex-col rounded-lg  w-full sm:px-8 sm:py-4">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-1" aria-label="post-form">
          <div className="mb-4">
            <label
              htmlFor="company_name"
              className="block text-gray-700 text-sm  font-bold mb-2 after:content-['*'] after:text-blue-violet"
            >Yrityksen nimi</label>
            <input
              {
                ...register("company_name", {
                  required:"Company name is required",
                  minLength: {
                    value: 1,
                    message: "Company name must be at least 1 characters",
                  },
                  validate: (value) => (value.trim().length < 1 ? "Company name is required" : true)
                })
              }
              type="text"
              autoComplete="on"
              name="company_name"
              id="company_name"
              className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-8 focus:outline-none focus:border-blue-violet border-slate-300"
            />
            
            {errors.company_name && (
              <p className=" text-orange text-sm">{`${errors.company_name.message}`}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm  font-bold mb-2 after:content-['*'] after:text-blue-violet"
            >Otsikko</label>
            
            <input
              {
                ...register("title", {
                  required:"Title is required",
                  minLength: {
                    value: 2,
                    message: "Title must be at least 2 characters",
                  },
                  validate: (value) => (value.trim().length < 2 ? "Title is required" : true)
                })
              }
              type="text"
              autoComplete="off"
              name="title"
              id="title"
              className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-8 focus:outline-none focus:border-blue-violet border-slate-300 "
            />
            {errors.title && (
              <p className=" text-orange text-sm">{`${errors.title.message}`}</p>
            )}
          </div>  
          <div className="mb-4">
            <label
              htmlFor="content"
              className=" block text-gray-700 text-sm  font-bold mb-2 after:content-['*'] after:text-blue-violet"

            >Sisältö</label>
            <textarea
              {
                ...register("content", {
                  required:"Content is required",
                  minLength: {
                    value: 10,
                    message: "Content must be at least 10 characters",
                  },
                  validate: (value) => (!value.trim() ? "Content must be at least 10 characters" : true)
                })
              }
              cols={30}
              rows= {5}
              autoComplete="off"
              name="content"
              id="content"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-8 focus:outline-none focus:border-blue-violet border-slate-300"
              placeholder=""
            ></textarea>          
            
            {errors.content && (
              <p className=" text-orange text-sm">{`${errors.content.message}`}</p>
            )}
          </div>
          <div className="mb-4">
              <label
                htmlFor="file"
                className="block font-medium"
              >
                Media
              </label>
              <input
                {
                  ...register("file",  {
                    // required:"File is required",
                    validate: (value) => {
                      if (value && (value as FileList)[0] && !(value as FileList)[0].type.includes('image')) {
                          return 'Invalid file format. Only image files are allowed.';
                      }
                      if (value && (value as FileList)[0] && (value as FileList)[0].size > 10000000) {
                        return 'Invalid file size. Only files under 10MB are allowed';
                      }
                      return true;
                  }
                  })
                }
                autoComplete="off"
                id="file_input"
                type="file"
                name="file"
              />
            </div>
            {errors.file && (
              <p className=" text-orange text-sm">{`${errors.file.message}`}</p>
            )}
          <div className="flex">
            <input 
              type="submit" 
              className="  w-full sm:w-2/3 mx-auto text-center bg-blue-violet hover:bg-blue-darker text-white p-3 mt-2 rounded-lg text-xl"
              value={`${isSubmitting ? 'Julkaistaan...' : 'Julkaista'}`} />
          </div>
        </form>
      </div>
    </>
  );
};

export default PostForm;
