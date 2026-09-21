import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import { setProfile, type UserProfilePayload } from "../slices/authSlice";

export interface UserSearchResult {
  username: string;
  nickname: string;
  n_seguidores: number;
  n_seguindo: number;
  foto: string | null;
  seguindo: boolean;
}

interface ChangePasswordPayload {
  senha_atual: string;
  senha_nova: string;
}

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["UserProfile"],

  endpoints: (builder) => ({
    getUserProfile: builder.query<UserProfilePayload, void>({
      query: () => ({
        url: `/usuariocliente/`,
        method: "GET",
      }),
      providesTags: ["UserProfile"], //
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setProfile(data));
        } catch {
          //
        }
      },
    }),
    searchUsers: builder.query<UserSearchResult[], string>({
      query: (keyword) => ({
        url: `/buscar/?search=${keyword}`,
        method: "GET",
        providesTags: ["UserProfile"],
      }),
    }),
    getPublicUserProfile: builder.query<UserProfilePayload, string>({
      query: (username) => ({ url: `/usuario/${username}`, method: "GET" }),
      providesTags: ["UserProfile"],
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
    getAllUsers: builder.query<UserSearchResult[], void>({
      query: () => ({
        url: `/usuarios/`,
        method: "GET",
      }),
    }),
    follow: builder.mutation<void, { alvo: string }>({
      query: (body) => ({ url: "/seguir/", method: "POST", body }),
    }),
    unfollow: builder.mutation<void, { alvo: string }>({
      query: (body) => ({ url: "/seguir/", method: "DELETE", body }),
    }),
    editProfile: builder.mutation<UserProfilePayload, FormData>({
      query: (formData) => ({
        url: "/editar-perfil/",
        method: "PATCH",
        body: formData,
      }),

      invalidatesTags: ["UserProfile"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setProfile(data));
        } catch {
          //
        }
      },
    }),
    changePassword: builder.mutation<void, ChangePasswordPayload>({
      query: (body) => ({
        url: "/alterar-senha/",
        method: "PATCH",
        body,
      }),
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
  useEditProfileMutation,
  useChangePasswordMutation,
  useGetAllUsersQuery,
} = usersApi;
