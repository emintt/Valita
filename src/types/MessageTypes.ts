type MessageResponse = {
  message: string;
};

type ErrorResponse = MessageResponse & {
  stack?: string;
};

type CompanyResponse = MessageResponse & {
  company_id: number;
};

export type {MessageResponse, ErrorResponse, CompanyResponse};