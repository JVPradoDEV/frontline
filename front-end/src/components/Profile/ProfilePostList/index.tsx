import { colors } from "../../../styles/colors";
import type { PostData } from "../../../types/post";
import { PostCard } from "../../Feed/PostCard";
import { ProfilePostsContainer, ProfilePostsTitle } from "./styles";

interface ProfilePostListProps {
  posts: PostData[];
  isOwnProfile: boolean;
}

export function ProfilePostList({ posts }: ProfilePostListProps) {
  return (
    <ProfilePostsContainer>
      <ProfilePostsTitle>Posts desta conta:</ProfilePostsTitle>

      {posts.length === 0 ? (
        <p
          style={{
            color: `${colors.mockColor}`,
            padding: "24px",
            textAlign: "center",
          }}
        >
          Nenhum post ainda.
        </p>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post.id}
            conteudo={post.conteudo}
            foto={post.autor.foto}
            username={post.autor.username}
            nickname={post.autor.nickname}
            id={post.id}
            n_comentarios={post.n_comentarios}
            n_likes={post.n_likes}
            deu_like={post.deu_like}
          />
        ))
      )}
    </ProfilePostsContainer>
  );
}
