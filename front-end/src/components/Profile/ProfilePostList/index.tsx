import { colors } from "../../../styles/colors";
import type { PostData } from "../../../types/post";
import { PostCard } from "../../Feed/PostCard";
import { ProfilePostsContainer, ProfilePostsTitle } from "./styles";

interface ProfilePostListProps {
  posts: PostData[];
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
        posts.map((post) => <PostCard key={post.id} {...post} />)
      )}
    </ProfilePostsContainer>
  );
}
