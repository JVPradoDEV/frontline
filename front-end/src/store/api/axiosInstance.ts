import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import type { AppStore } from "../index";
import { logout, updateAccessToken } from "../slices/authSlice";
import { BASE_URL } from "./constants"; // ← centralizado

declare module "axios" {
  interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token!)));
  failedQueue = [];
}

export function setupAxiosInterceptors(store: AppStore) {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = store.getState().auth.accessToken;
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const original = error.config!;
      if (error.response?.status !== 401 || original._retry)
        return Promise.reject(error);

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          original.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(original);
        });
      }

      original._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        store.dispatch(logout());
        return Promise.reject(error);
      }

      try {
        const res = await fetch(`${BASE_URL}/auth/refresh`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh: refreshToken }),
        });

        if (!res.ok) throw new Error("Refresh inválido");

        const { access: newToken } = await res.json();
        store.dispatch(updateAccessToken(newToken));
        processQueue(null, newToken);
        original.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(original);
      } catch (err) {
        processQueue(err, null);
        store.dispatch(logout());
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    },
  );
}
