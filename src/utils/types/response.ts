export interface IResponseMeta {
  operation?: string;
  method?: string;
  paging?: string | null;
}

export interface IResponseError {
  code?: string | number;
  message?: string;
  error?: string;
}

export  interface IResponse<T> {
  meta: IResponseMeta;
  data: T[];
  errors: IResponseError[];
}

export interface IResponseOptions<T> {
  value?: T | null | undefined;
}
