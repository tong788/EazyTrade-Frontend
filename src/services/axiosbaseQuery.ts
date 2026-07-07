import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { AxiosError, AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axios.config";

type queryParams = {
  url: AxiosRequestConfig["url"];
  method: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
};

export type ApiError = {
  status: number | string | undefined;
  code: string | undefined;
  message: string | undefined;
  data: unknown;
};

const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string }): BaseQueryFn<queryParams, unknown, ApiError> =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
      });
      return { data: result.data };
    } catch (axiosError) {
      const error = axiosError as AxiosError<{
        Data?: unknown;
        ResponseCode?: string;
        Message?: string;
      }>;
      return {
        error: {
          status: error.response?.status ?? error.status,
          code: error.response?.data?.ResponseCode ?? error.code,
          message: error.response?.data.Message ?? error.message,
          data: error.response?.data.Data,
        },
      };
    }
  };

export default axiosBaseQuery;
