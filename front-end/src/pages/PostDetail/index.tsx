import { useParams, useNavigate } from "react-router-dom";
import { usePosts } from "../../contexts/PostsContext";
import { FeedSidebar } from "../../components/Feed/FeedSidebar";
import { PostFocus } from "../../components/Post/PostFocus";
import { CreateComment } from "../../components/Post/CreateComment";
import { CommentCard } from "../../components/Post/CommentCard";
import {
  PostDetailLayout,
  PostDetailMain,
  PostDetailHeader,
  BackButton,
  PageTitle,
  CommentsSection,
  GlobalBackground,
} from "./styles";
import { BackIcon } from "../../styles/svgs";

export function PostDetailPage() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { posts } = usePosts();

  const post = posts.find((p) => p.id === Number(postId));

  return (
    <>
      <GlobalBackground />
      <PostDetailLayout>
        <FeedSidebar />
        <PostDetailMain>
          <PostDetailHeader>
            <BackButton onClick={() => navigate("/feed")} aria-label="Voltar">
              <BackIcon />
            </BackButton>
            <PageTitle>Post</PageTitle>
          </PostDetailHeader>

          {post ? (
            <>
              <PostFocus post={post} />
              <CreateComment postId={post.id} />
              <CommentsSection>
                {post.comments.map((comment) => (
                  <CommentCard key={comment.id} comment={comment} />
                ))}
              </CommentsSection>
            </>
          ) : (
            <p style={{ color: "#888", padding: "24px" }}>
              Post não encontrado.
            </p>
          )}
        </PostDetailMain>
      </PostDetailLayout>
    </>
  );
}
