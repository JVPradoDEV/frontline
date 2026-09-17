import { useNavigate } from "react-router-dom";
import type { PostData } from "../../../types/post";
import {
  PostCardContainer,
  PostAvatar,
  PostBody,
  PostHeader,
  PostUserName,
  PostUserHandle,
  PostText,
  PostActions,
  ActionBtn,
  ActionCount,
} from "./styles";

// ── Ícones ────────────────────────────────────────────────────────────────────
const CommentIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const LikeIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const ProfileIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
// ─────────────────────────────────────────────────────────────────────────────

export function PostCard({
  id,
  userName,
  userHandle,
  content,
  commentsCount,
  likesCount,
  avatarColor = "#e05252",
}: PostData) {
  const navigate = useNavigate();

  return (
    <PostCardContainer onClick={() => navigate(`/feed/${id}`)}>
      <PostAvatar $color={avatarColor} />

      <PostBody>
        <PostHeader>
          <PostUserName>{userName}</PostUserName>
          <PostUserHandle>{userHandle}</PostUserHandle>
          <ProfileIcon />
        </PostHeader>

        <PostText>{content}</PostText>

        <PostActions>
          <ActionBtn
            aria-label="Comentários"
            onClick={(e) => e.stopPropagation()}
          >
            <CommentIcon />
            <ActionCount>{commentsCount}</ActionCount>
          </ActionBtn>

          <ActionBtn aria-label="Curtidas" onClick={(e) => e.stopPropagation()}>
            <LikeIcon />
            <ActionCount>{likesCount}</ActionCount>
          </ActionBtn>
        </PostActions>
      </PostBody>
    </PostCardContainer>
  );
}
