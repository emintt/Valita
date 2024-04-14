import { ErrorResponse } from '@sharedTypes/MessageTypes';
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



export type {Post, PostWithCompanyName, Company};
