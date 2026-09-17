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

interface PostFocusProps {
  post: PostData;
}

export function PostFocus({ post }: PostFocusProps) {
  return (
    <PostFocusContainer>
      <FocusHeader>
        <FocusAvatar $color={post.avatarColor ?? "#555"} />
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
