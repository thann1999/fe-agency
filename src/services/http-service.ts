/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { Method } from 'axios';
import { t } from 'i18next';
import { toast } from 'react-toastify';

import { ACCESS_TOKEN, Message } from '@constants';
import { HttpMethod, HttpOptions, ResponseData, ThrowErrorStrategy } from '@interfaces';
import keycloak from '@root/keycloak-config';

import storageService from './storage/storage.service';

class HttpService {
  private commonHeader = {
    Accept: 'application/json',
    'Cache-Control': 'no-cache no-store',
    Pragma: 'no-cache',
    Expires: '0',
    'Access-Control-Allow-Origin': '*',
  };

  private instance = axios.create({
    timeout: 300000,
  });

  constructor() {
    this.interceptor();
  }

  public get<T>(uri: string, options?: HttpOptions): Promise<ResponseData<T>> {
    return this.request(uri, HttpMethod.GET, options);
  }

  public post<T>(uri: string, options?: HttpOptions): Promise<ResponseData<T>> {
    return this.request(uri, HttpMethod.POST, options);
  }

  public put<T>(uri: string, options?: HttpOptions): Promise<ResponseData<T>> {
    return this.request(uri, HttpMethod.PUT, options);
  }

  public delete<T>(uri: string, options?: any): Promise<ResponseData<T>> {
    return this.request(uri, HttpMethod.DELETE, options);
  }

  public async request<T>(
    uri: string,
    method: Method,
    options?: HttpOptions
  ): Promise<ResponseData<T>> {
    try {
      const url = this.resolve(uri);
      const response = await this.instance.request({
        url,
        method,
        data: options?.body,
        params: options?.queryParams,
        headers: this.generateHeader(options?.headers),
        signal: options?.signal,
      });

      return response.data;
    } catch (error) {
      return this.handleError(error, options?.throwError || ThrowErrorStrategy.ThrowAndNotify);
    }
  }

  private interceptor() {
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 403 && error.response?.data?.error === 'FORBIDDEN_ERROR') {
          keycloak.logout();
        }
        return Promise.reject(error);
      }
    );
  }

  private generateHeader = (header?: HeadersInit) => {
    const token = storageService.get(ACCESS_TOKEN);

    return {
      ...this.commonHeader,
      ...header,
      Authorization: `Bearer ${token}`,
    } as any;
  };

  private resolve = (uri: string): string => {
    if (/^(http|https):\/\/.+$/.test(uri)) {
      return uri;
    }
    return `${import.meta.env.VITE_REACT_APP_BASE_API_URL}${uri}`;
  };

  private handleError(error: any, throwErrorStrategy: ThrowErrorStrategy): any {
    const toastMessage =
      error.response?.data?.msg || t(Message.PROCESSING_ERROR, 'There was an error in processing');
    switch (throwErrorStrategy) {
      case ThrowErrorStrategy.ThrowOnly:
        throw error;
      default:
        toast.error(toastMessage);
        throw error;
    }
  }
}

export default new HttpService();
