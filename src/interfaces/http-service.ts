/* eslint-disable no-unused-vars */
export enum HttpStatus {
  SUCCESS = 200,
  UNAUTHORIZED = 401,
  BAD_REQUEST = 400,
}

export interface HttpResponse<T> {
  message?: string;
  data: T;
  status: number;
  header?: HeadersInit;
}

export interface ResponseData<T> {
  data: T;
  currentTime: string;
  msg: string;
  status: number;
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum ThrowErrorStrategy {
  ThrowOnly = 1,
  ThrowAndNotify = 2,
}

export interface HttpOptions {
  queryParams?: Record<
    string,
    string | number | boolean | string[] | number[] | boolean[] | undefined
  >;
  body?: Record<string, any> | BodyInit;
  headers?: HeadersInit;
  throwError?: ThrowErrorStrategy;
  signal?: AbortSignal;
}
