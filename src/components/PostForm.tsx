'use client';
import { fetchData } from "@/lib/functions";
import { CompanyResponse, MessageResponse } from "@/types/MessageTypes";
import { useRouter } from "next/navigation";
import { stringify } from "querystring";
import { FieldValues, useForm } from "react-hook-form";

type PostFormField = {
  company_name: string;
  title: string;
  content: string;
}

const PostForm =  () => {
  const router = useRouter();
  const {
    register, 
    handleSubmit, 
    formState: {errors, isSubmitting}, 
    reset, 
    getValues
  } = useForm<PostFormField>();

  

  const onSubmit = async (data : FieldValues) => {
    console.log('data', data);
    try {
      // create form data and add the form content to it
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      
      // post company name to database
      const companyData = {
        company_name: data.company_name,
      }
      // send company name to Nextjs API end point /api/company
      const companyResult = await fetchData<CompanyResponse>('/api/company', {
        method: 'POST',
        body: JSON.stringify(companyData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!companyResult) {
        throw new Error('Error posting company name');
      }

      // TODO: fix the ERROR
      formData.append('company_id', companyResult.company_id);
      console.log(formData.get('company_id'));
      
      // send the form data to Next.js API endpoint /api/post
      const options: RequestInit = {
          method: 'POST',
          body: formData,    
        };
      await fetchData<MessageResponse>('/api/post', options);
      
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error(error);
    }
    // reset();
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="company_name"
          >
            <span className="hidden">Company name</span>
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
              name="company_name"
              id="company_name"
              className="shadow border rounded w-full py-2 px-3 text-gray-800 focus:outline-none focus:shadow-outline"
              placeholder="Yrityksen nimi"
            />
          </label>
          {errors.company_name && (
            <p className=" text-red-600">{`${errors.company_name.message}`}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="title"
          >
            <span className="hidden">Title</span>
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
              name="title"
              id="title"
              className="shadow border rounded w-full py-2 px-3 text-gray-800 focus:outline-none focus:shadow-outline"
              placeholder="Otsikko"
            />
          </label>
          {errors.title && (
            <p className=" text-red-600">{`${errors.title.message}`}</p>
          )}
        </div>  
        <div className="mb-4">
          <label
            htmlFor="content"
          >
            <span className="hidden">Content</span>
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
              name="content"
              id="content"
              className="shadow border rounded w-full py-2 px-3 text-gray-800 focus:outline-none focus:shadow-outline"
              placeholder="Mitä mietit?"
            ></textarea>          
          </label>
          {errors.content && (
            <p className=" text-red-600">{`${errors.content.message}`}</p>
          )}
        </div>
        <div>
          <input type="submit" value="Luo julkaisu" />
        </div>
      </form>
    </div>
  );
};

export default PostForm;
