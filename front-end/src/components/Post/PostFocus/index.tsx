import { colors } from "../../../styles/colors";
import { ProfileIcon } from "../../../styles/svgs";
import type { PostData } from "../../../types/post";
import {
  PostFocusContainer,
  FocusHeader,
  FocusAvatar,
  FocusUserInfo,
  FocusUserName,
  FocusUserHandle,
  FocusContent,
} from "./styles";

interface PostFocusProps {
  post: PostData;
}

export function PostFocus({ post }: PostFocusProps) {
  return (
    <PostFocusContainer>
      <FocusHeader>
        <FocusAvatar $color={post.avatarColor ?? `${colors.mockColor}`} />
        <FocusUserInfo>
          <FocusUserName>{post.userName}</FocusUserName>
          <FocusUserHandle>
            {post.userHandle} <ProfileIcon />
          </FocusUserHandle>
        </FocusUserInfo>
      </FocusHeader>

      <FocusContent>{post.content}</FocusContent>
    </PostFocusContainer>
  );
}
