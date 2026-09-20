import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import type { CommentData, PostData } from "../../types/post";

interface LikePayload {
  tipo: "post" | "comentario";
  id: number;
}

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Post", "Comment"],
  endpoints: (builder) => ({
    getFeed: builder.query<PostData[], void>({
      query: () => ({
        url: "/feed/",
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
    getPostById: builder.query<PostData, number>({
      query: (id) => ({ url: `/posts/${id}/`, method: "GET" }),
      providesTags: ["Post"],
    }),
    createPost: builder.mutation<PostData, { conteudo: string }>({
      query: (body) => ({
        url: "/posts/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Post"],
    }),
    getComments: builder.query<CommentData[], void>({
      query: () => ({
        url: "/comentarios/",
        method: "GET",
      }),
      providesTags: ["Comment"],
    }),
    getCommentsByPost: builder.query<CommentData[], number>({
      query: (postId) => ({
        url: `/post/${postId}/comentarios`,
        method: "GET",
      }),
      providesTags: ["Comment"],
    }),
    createComment: builder.mutation<void, { conteudo: string; post: number }>({
      query: (body) => ({
        url: "/comentarios/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Post", "Comment"],
    }),
    like: builder.mutation<void, LikePayload>({
      query: (body) => ({ url: "/like/", method: "POST", body }),
      invalidatesTags: ["Post", "Comment"],
    }),

    unlike: builder.mutation<void, LikePayload>({
      query: (body) => ({ url: "/like/", method: "DELETE", body }),
      invalidatesTags: ["Post", "Comment"],
    }),
    getSelectedUserPosts: builder.mutation<PostData[], void>({
      query: (body) => ({
        url: "/usuariocliente/posts",
        method: "GET",
        body,
      }),
      invalidatesTags: ["Post"],
    }),
    getUserPosts: builder.query<PostData[], string>({
      query: (username) => ({
        url: `/${username}/posts`,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
  }),
});

export const {
  useGetFeedQuery,
  useCreatePostMutation,
  useCreateCommentMutation,
  useGetCommentsQuery,
  useGetSelectedUserPostsMutation,
  useGetUserPostsQuery,
  useGetCommentsByPostQuery,
  useGetPostByIdQuery,
  useLikeMutation,
  useUnlikeMutation,
} = postsApi;
