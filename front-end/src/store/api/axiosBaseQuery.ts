import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { axiosInstance } from "./axiosInstance";

export interface AxiosBaseQueryArgs {
  url: string;
  method?: AxiosRequestConfig["method"];
  body?: unknown;
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
}

interface QueryError {
  status?: number;
  data?: unknown;
}

type AxiosQueryFn = BaseQueryFn<AxiosBaseQueryArgs, unknown, QueryError>;

export const axiosBaseQuery =
  (): AxiosQueryFn =>
  async ({ url, method = "GET", body, params, headers }) => {
    try {
      const result = await axiosInstance({
        url,
        method,
        data: body,
        params,
        headers,
      });
      return { data: result.data };
    } catch (err) {
      const error = err as AxiosError;
      return {
        error: {
          status: error.response?.status,
          data: error.response?.data ?? error.message,
        },
      };
    }
  };
