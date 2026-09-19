import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

export interface AuthApiResponse {
  access: string;
  refresh: string;
  userId: number;
  username: string;
}

export interface RegisterPayload {
  username: string;
  password: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface UpdateNicknameArgs {
  userId: number;
  nickname: string;
  // ← token saiu daqui; o interceptor cuida disso
}

export const authApi = createApi({
  reducerPath: "https://frontline-backend.vercel.app",
  baseQuery: axiosBaseQuery(),

  endpoints: (builder) => ({
    register: builder.mutation<AuthApiResponse, RegisterPayload>({
      query: (body) => ({
        url: "/cadastro/",
        method: "POST",
        body,
      }),
    }),

    login: builder.mutation<AuthApiResponse, LoginPayload>({
      query: (body) => ({
        url: "/login/",
        method: "POST",
        body,
      }),
    }),

    updateNickname: builder.mutation<void, UpdateNicknameArgs>({
      query: ({ userId, nickname }) => ({
        url: `/users/${userId}`,
        method: "PATCH",
        body: { nickname },
        // Authorization é injetado pelo interceptor do Axios
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useUpdateNicknameMutation,
} = authApi;
