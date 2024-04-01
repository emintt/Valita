'use client'


export const revalidate = 0;

const PostForm =  () => {
  return (
    <div>
      <form action="">
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
            htmlFor="company_name"
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
            htmlFor="company_name"
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
      </form>
    </div>
  );
};

export default PostForm;
