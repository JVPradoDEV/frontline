import { useNavigate } from "react-router-dom";
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
import {
  useLikeMutation,
  useUnlikeMutation,
} from "../../../store/api/postsApi";
import { useState } from "react";

interface PostProps {
  id: number;
  username: string;
  nickname: string;
  conteudo: string;
  n_comentarios: number;
  n_likes: number;
  foto?: string;
  deu_like: boolean;
}

export function PostCard({
  id,
  username,
  nickname,
  conteudo,
  n_comentarios,
  n_likes,
  deu_like,
}: PostProps) {
  const navigate = useNavigate();

  const [liked, setLiked] = useState(deu_like || false);
  const [likesCount, setLikesCount] = useState(n_likes);

  const [prevDeuLike, setPrevDeuLike] = useState(deu_like);
  const [prevNLikes, setPrevNLikes] = useState(n_likes);

  if (deu_like !== prevDeuLike || n_likes !== prevNLikes) {
    setPrevDeuLike(deu_like);
    setPrevNLikes(n_likes);

    setLiked(deu_like || false);
    setLikesCount(n_likes);
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
      setLikesCount(n_likes);
      console.error("Erro ao curtir post.");
    }
  }

  return (
    <PostCardContainer onClick={() => navigate(`/feed/${id}`)}>
      <PostAvatar $color={colors.mockColor} />

      <PostBody>
        <PostHeader>
          <PostUserName
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/perfil/${username}`);
            }}
            style={{ cursor: "pointer" }}
          >
            {nickname || username}
          </PostUserName>
          <PostUserHandle>@{username}</PostUserHandle>
          <ProfileIcon />
        </PostHeader>

        <PostText>{conteudo}</PostText>

        <PostActions>
          <ActionBtn
            aria-label="Comentários"
            onClick={(e) => e.stopPropagation()}
          >
            <CommentIcon />
            <ActionCount>{n_comentarios}</ActionCount>
          </ActionBtn>

          <ActionBtn aria-label="Curtidas" $liked={liked} onClick={handleLike}>
            <LikeIcon />
            <ActionCount>{likesCount}</ActionCount>
          </ActionBtn>
        </PostActions>
      </PostBody>
    </PostCardContainer>
  );
}
