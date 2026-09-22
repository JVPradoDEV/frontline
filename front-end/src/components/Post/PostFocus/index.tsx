import { useState } from "react";
import { LikeIcon, ProfileIcon } from "../../../styles/svgs";
import type { PostData } from "../../../types/post";
import {
  PostFocusContainer,
  FocusHeader,
  FocusAvatar,
  FocusUserInfo,
  FocusUserName,
  FocusUserHandle,
  FocusContent,
  FocusLikeCount,
  FocusLikeBtn,
} from "./styles";
import {
  useLikeMutation,
  useUnlikeMutation,
} from "../../../store/api/postsApi";

interface PostFocusProps {
  post: PostData;
}

export function PostFocus({ post }: PostFocusProps) {
  const { id, n_likes, deu_like, autor, conteudo } = post;

  const [liked, setLiked] = useState(deu_like || false);
  const [likesCount, setLikesCount] = useState(n_likes ?? 0);

  const [prevDeuLike, setPrevDeuLike] = useState(deu_like);
  const [prevNLikes, setPrevNLikes] = useState(n_likes);

  if (deu_like !== prevDeuLike || n_likes !== prevNLikes) {
    setPrevDeuLike(deu_like);
    setPrevNLikes(n_likes);

    setLiked(deu_like || false);
    setLikesCount(n_likes ?? 0);
  }

  const [like] = useLikeMutation();
  const [unlike] = useUnlikeMutation();

  async function handleLike(e: React.MouseEvent) {
    e.stopPropagation();

    try {
      if (liked) {
        setLiked(false);
        setLikesCount((c) => c - 1);
        await unlike({ tipo: "post", id }).unwrap();
      } else {
        setLiked(true);
        setLikesCount((c) => c + 1);
        await like({ tipo: "post", id }).unwrap();
      }
    } catch {
      setLiked(deu_like || false);
      setLikesCount(n_likes ?? 0);
      console.error("Erro ao curtir post em foco.");
    }
  }

  return (
    <PostFocusContainer>
      <FocusHeader>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <FocusAvatar $foto={autor.foto} />
          <FocusUserInfo>
            <FocusUserName>{autor.nickname || autor.username}</FocusUserName>
            <FocusUserHandle>
              @{autor.username} <ProfileIcon />
            </FocusUserHandle>
          </FocusUserInfo>
        </div>

        <FocusLikeBtn
          aria-label="Curtir post"
          $liked={liked}
          onClick={handleLike}
        >
          <LikeIcon />
          <FocusLikeCount>{likesCount}</FocusLikeCount>
        </FocusLikeBtn>
      </FocusHeader>

      <FocusContent>{conteudo}</FocusContent>
    </PostFocusContainer>
  );
}
