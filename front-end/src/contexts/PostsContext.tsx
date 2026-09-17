import { createContext, useContext, useState, type ReactNode } from "react";
import type { PostData, CommentData } from "../types/post";

const INITIAL_POSTS: PostData[] = [
  {
    id: 1,
    userName: "UsuarioDois",
    userHandle: "@usuario_2",
    content: "Olá, tudo bem?",
    commentsCount: 1,
    likesCount: 5,
    avatarColor: "#e05252",
    comments: [
      {
        id: 1,
        userName: "UsuarioDois",
        userHandle: "@usuario_2",
        content: "Oiii!",
        likesCount: 5,
        avatarColor: "#e05252",
      },
    ],
  },
  {
    id: 2,
    userName: "UsuarioDois",
    userHandle: "@usuario_2",
    content: "Olá, tudo bem?",
    commentsCount: 0,
    likesCount: 5,
    avatarColor: "#e05252",
    comments: [],
  },
];

interface PostsContextData {
  posts: PostData[];
  addPost: (content: string) => void;
  addComment: (postId: number, content: string) => void;
}

const PostsContext = createContext<PostsContextData>({} as PostsContextData);

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<PostData[]>(INITIAL_POSTS);

  function addPost(content: string) {
    const newPost: PostData = {
      id: Date.now(),
      userName: "usuario",
      userHandle: "@usuario",
      content,
      commentsCount: 0,
      likesCount: 0,
      avatarColor: "#555",
      comments: [],
    };
    setPosts((prev) => [newPost, ...prev]);
  }

  function addComment(postId: number, content: string) {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;

        const newComment: CommentData = {
          id: Date.now(),
          userName: "usuario",
          userHandle: "@usuario",
          content,
          likesCount: 0,
          avatarColor: "#555",
        };

        return {
          ...post,
          commentsCount: post.commentsCount + 1,
          comments: [newComment, ...post.comments],
        };
      }),
    );
  }

  return (
    <PostsContext.Provider value={{ posts, addPost, addComment }}>
      {children}
    </PostsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePosts() {
  return useContext(PostsContext);
}
