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
  company_name: string | undefined;
  created_at: Date;
};

type PostWithCompanyName = Post & Pick<Company, 'company_name'>;

type UserWithLevel = {
  user_id: number;
  password: string;
  email: string;
  created_at: Date;
  level_name: string;
};

type TokenContent = {
  user_id: number;
  level_name: string;
};

type UserLevel = {
  level_id: number; 
  level_name: 'Admin' | 'User';
};

type User = {
  user_id: number; 
  password: string;
  email: string;
  user_level_id: number;
  created_at: Date | string;
};

type UserWithNoPassword = Omit<UserWithLevel, 'password'>;

export type {Post, PostWithCompanyName, Company, UserWithLevel, TokenContent, User, UserWithNoPassword, UserLevel};
