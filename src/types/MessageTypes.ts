import { Company } from "./DBTypes";

type MessageResponse = {
  message: string;
};

type ErrorResponse = MessageResponse & {
  stack?: string;
};

type CompanyResponse = MessageResponse & {
  company_id: number;
};

type SearchResponse = {
  message: string;
  data?: Company[] | null;
}

type UploadResponse = MessageResponse & {
  data: {
      filename: string;
      media_type: string;
      filesize: number;
  };
}

export type { MessageResponse, ErrorResponse, CompanyResponse, SearchResponse, UploadResponse };
