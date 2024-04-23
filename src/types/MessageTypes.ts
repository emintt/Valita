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

export type {MessageResponse, ErrorResponse, CompanyResponse, SearchResponse};
