import { usePosts } from "../../../contexts/PostsContext";
import { colors } from "../../../styles/colors";
import { PostCard } from "../PostCard";
import { PostListContainer } from "./styles";

export function PostList() {
  const { posts } = usePosts();

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
          Nenhum post ainda. Seja o primeiro!
        </p>
      ) : (
        posts.map((post) => <PostCard key={post.id} {...post} />)
      )}
    </PostListContainer>
  );
}
