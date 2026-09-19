import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import { setProfile, type UserProfilePayload } from "../slices/authSlice";

export interface UserSearchResult {
  username: string;
  seguidores: number;
  seguindo: number;
  foto: string;
}

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: axiosBaseQuery(),

  endpoints: (builder) => ({
    // GET /usuario/{username} — Authorization injetado pelo interceptor
    getUserProfile: builder.query<UserProfilePayload, void>({
      query: () => ({
        url: `/usuariocliente/`,
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setProfile(data));
        } catch {
          // Falha silenciosa — o token pode ter expirado (o interceptor cuida)
        }
      },
    }),

    searchUsers: builder.query<UserSearchResult[], string>({
      query: (keyword) => ({
        url: "/users/search",
        method: "GET",
        params: { q: keyword },
      }),
    }),

    getPublicUserProfile: builder.query<UserProfilePayload, string>({
      query: (username) => ({
        url: `/usuario/${username}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useLazySearchUsersQuery,
  useGetPublicUserProfileQuery,
} = usersApi;
