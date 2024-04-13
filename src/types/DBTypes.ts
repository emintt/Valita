type Post = {
  post_id: number;
  user_id: number;
  company_id: number;
  filename: string;
  filesize: number;
  media_type: string;
  title: string;
  content: string;
  created_at: Date;
};

type Company = {
  company_id: number;
  company_name: string;
  created_at: Date;
};

type PostWithCompanyName = Post & Pick<Company, 'company_name'>;

type UserWithLevel = {
  user_id: number;
  password: string;
  email: string;
  created_at: Date
  level_name: string;
}


export type {Post, PostWithCompanyName, Company, UserWithLevel};
