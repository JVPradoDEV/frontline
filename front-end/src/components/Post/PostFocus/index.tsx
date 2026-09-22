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
        <FocusAvatar $foto={post.autor.foto} />
        <FocusUserInfo>
          <FocusUserName>{post.autor.username}</FocusUserName>
          <FocusUserHandle>
            {post.autor.nickname} <ProfileIcon />
          </FocusUserHandle>
        </FocusUserInfo>
      </FocusHeader>

      <FocusContent>{post.conteudo}</FocusContent>
    </PostFocusContainer>
  );
}
