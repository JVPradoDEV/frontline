import { useParams, useNavigate } from "react-router-dom";
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
import {
  useGetCommentsByPostQuery,
  useGetPostByIdQuery,
} from "../../store/api/postsApi";
import { colors } from "../../styles/colors";

export function PostDetailPage() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const id = Number(postId);

  const { data: post, isLoading: loadingPost } = useGetPostByIdQuery(id, {
    skip: !id,
  });

  const { data: postComments = [], isLoading: loadingComments } =
    useGetCommentsByPostQuery(id, { skip: !id });

  const isLoading = loadingPost || loadingComments;

  return (
    <>
      <GlobalBackground />
      <PostDetailLayout>
        <FeedSidebar />
        <PostDetailMain>
          <PostDetailHeader>
            <BackButton onClick={() => navigate(-1)} aria-label="Voltar">
              <BackIcon />
            </BackButton>
            <PageTitle>Post</PageTitle>
          </PostDetailHeader>

          {isLoading && (
            <p style={{ color: `${colors.mockColor}`, padding: "24px" }}>
              Carregando...
            </p>
          )}

          {!isLoading && post && (
            <>
              <PostFocus post={post} />
              <CreateComment postId={post.id} />
              <CommentsSection>
                {postComments.length === 0 ? (
                  <p
                    style={{
                      color: `${colors.gray}`,
                      padding: "24px",
                      textAlign: "center",
                    }}
                  >
                    Nenhum comentário ainda.
                  </p>
                ) : (
                  postComments.map((comment) => (
                    <CommentCard key={comment.id} comment={comment} />
                  ))
                )}
              </CommentsSection>
            </>
          )}

          {!isLoading && !post && (
            <p style={{ color: `${colors.gray}`, padding: "24px" }}>
              Post não encontrado.
            </p>
          )}
        </PostDetailMain>
      </PostDetailLayout>
    </>
  );
}
