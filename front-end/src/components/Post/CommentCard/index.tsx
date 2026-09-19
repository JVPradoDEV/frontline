import { colors } from "../../../styles/colors";
import { LikeIcon, ProfileIcon } from "../../../styles/svgs";
import type { CommentData } from "../../../types/post";
import {
  CommentCardContainer,
  CommentAvatar,
  CommentBody,
  CommentHeader,
  CommentUserName,
  CommentUserHandle,
  CommentText,
  LikeBtn,
  LikeCount,
} from "./styles";

interface CommentCardProps {
  comment: CommentData;
}

export function CommentCard({ comment }: CommentCardProps) {
  const {
    userName,
    userHandle,
    content,
    likesCount,
    avatarColor = `${colors.lightRed}`,
  } = comment;

  return (
    <CommentCardContainer>
      <CommentAvatar $color={avatarColor} />

      <CommentBody>
        <CommentHeader>
          <CommentUserName>{userName}</CommentUserName>
          <CommentUserHandle>{userHandle}</CommentUserHandle>
          <ProfileIcon />
        </CommentHeader>

        <CommentText>{content}</CommentText>

        <LikeBtn aria-label="Curtir">
          <LikeIcon />
          <LikeCount>{likesCount}</LikeCount>
        </LikeBtn>
      </CommentBody>
    </CommentCardContainer>
  );
}
