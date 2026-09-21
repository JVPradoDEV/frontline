import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import { setProfile, type UserProfilePayload } from "../slices/authSlice";

export interface UserSearchResult {
  username: string;
  nickname: string;
  n_seguidores: number;
  n_seguindo: number;
  foto: string;
  seguindo: boolean;
}

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: axiosBaseQuery(),

  endpoints: (builder) => ({
    getUserProfile: builder.query<UserProfilePayload, string>({
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
        url: `/buscar/?search=${keyword}`,
        method: "GET",
      }),
    }),
    getPublicUserProfile: builder.query<UserProfilePayload, string>({
      query: (username) => ({
        url: `/usuario/${username}`,
        method: "GET",
      }),
    }),
    getUserFollowers: builder.query<UserSearchResult[], string>({
      query: (username) => ({
        url: `/usuario/${username}/seguidores/`,
        method: "GET",
      }),
    }),
    getUserFolloweds: builder.query<UserSearchResult[], string>({
      query: (username) => ({
        url: `/usuario/${username}/seguindo/`,
        method: "GET",
      }),
    }),
    follow: builder.mutation<void, { alvo: string }>({
      query: (body) => ({ url: "/seguir/", method: "POST", body }),
    }),
    unfollow: builder.mutation<void, { alvo: string }>({
      query: (body) => ({ url: "/seguir/", method: "DELETE", body }),
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useLazySearchUsersQuery,
  useGetPublicUserProfileQuery,
  useFollowMutation,
  useUnfollowMutation,
  useGetUserFollowedsQuery,
  useGetUserFollowersQuery,
} = usersApi;
