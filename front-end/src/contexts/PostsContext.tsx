import { createContext, useContext, useState, type ReactNode } from "react";
import type { PostData, CommentData } from "../types/post";
import { colors } from "../styles/colors";
import { useSelector } from "react-redux";
import { selectUserProfile } from "../store/slices/authSlice";

// // ── Mock de usuários ──────────────────────────────────────────────────────────
// const MOCK_USERS: UserProfile[] = [
//   {
//     id: 1,
//     userName: "Usuario",
//     userHandle: "usuario",
//     avatarColor: `${colors.mockColor}`,
//     followersCount: 32,
//     followingCount: 15,
//   },
//   {
//     id: 2,
//     userName: "UsuarioDois",
//     userHandle: "usuario_2",
//     avatarColor: `${colors.lightRed}`,
//     followersCount: 32,
//     followingCount: 15,
//   },
// ];

// Handle do usuário logado (mock — substituir por auth real futuramente)
export const CURRENT_USER_HANDLE = "usuario";

const INITIAL_POSTS: PostData[] = [];

// ── Mock inicial (substituir por GET /posts quando a API estiver pronta) ───────

interface PostsContextData {
  posts: PostData[];
  addPost: (content: string) => void;
  addComment: (postId: number, content: string) => void;
}

const PostsContext = createContext<PostsContextData>({} as PostsContextData);

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<PostData[]>(INITIAL_POSTS);
  const { username, nickname, foto } = useSelector(selectUserProfile);

  const currentName = nickname || username || "Usuario";
  const currentHandle = `@${username || "usuario"}`;
  const currentColor = foto ? "transparent" : `${colors.mockColor}`;

  function addPost(content: string) {
    const newPost: PostData = {
      id: Date.now(),
      userName: currentName,
      userHandle: currentHandle,
      content,
      commentsCount: 0,
      likesCount: 0,
      avatarColor: currentColor,
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
          userName: currentName,
          userHandle: currentHandle,
          content,
          likesCount: 0,
          avatarColor: currentColor,
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
