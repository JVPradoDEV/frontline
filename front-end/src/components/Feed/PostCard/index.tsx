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
import { CommentIcon, LikeIcon, ProfileIcon } from "../../../styles/svgs";
import { colors } from "../../../styles/colors";

export function PostCard({
  id,
  userName,
  userHandle,
  content,
  commentsCount,
  likesCount,
  avatarColor = `${colors.lightRed}`,
}: PostData) {
  const navigate = useNavigate();
  const handleWithoutAt = userHandle.replace("@", "");

  return (
    <PostCardContainer onClick={() => navigate(`/feed/${id}`)}>
      <PostAvatar $color={avatarColor} />

      <PostBody>
        <PostHeader>
          <PostUserName
            onClick={(e) => {
              e.stopPropagation(); // evita navegar para o post
              navigate(`/perfil/${handleWithoutAt}`);
            }}
            style={{ cursor: "pointer" }}
          >
            {userName}
          </PostUserName>
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
