import { useGetFeedQuery } from "../../../store/api/postsApi";
import { colors } from "../../../styles/colors";
import { PostCard } from "../PostCard";
import { PostListContainer } from "./styles";

export function PostList() {
  const { data: posts = [], isLoading, isError } = useGetFeedQuery();

  if (isLoading) {
    return (
      <p style={{ textAlign: "center", padding: "24px", color: "white" }}>
        Carregando feed...
      </p>
    );
  }

  if (isError) {
    return (
      <p style={{ textAlign: "center", padding: "24px" }}>
        Erro ao carregar o feed.
      </p>
    );
  }

  return (
    <PostListContainer>
      {posts.length === 0 ? (
        <p
          style={{
            color: `${colors.gray}`,
            padding: "24px",
            textAlign: "center",
          }}
        >
          Nenhum post ainda. Busque usuários para atualizar seu Feed!
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
    </PostListContainer>
  );
}
