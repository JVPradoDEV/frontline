import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
import {
  useLikeMutation,
  useUnlikeMutation,
} from "../../../store/api/postsApi";

interface CommentCardProps {
  comment: CommentData;
}

export function CommentCard({ comment }: CommentCardProps) {
  const navigate = useNavigate();
  const { conteudo, autor, id, n_likes, deu_like } = comment;
  const displayName = autor.nickname || autor.username;

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

  async function handleLike() {
    try {
      if (liked) {
        setLiked(false);
        setLikesCount((c) => c - 1);
        await unlike({ tipo: "comentario", id }).unwrap();
      } else {
        setLiked(true);
        setLikesCount((c) => c + 1);
        await like({ tipo: "comentario", id }).unwrap();
      }
    } catch {
      setLiked(comment.deu_like || false);
      setLikesCount(comment.n_likes ?? 0);
      console.error("Erro ao curtir comentário.");
    }
  }

  return (
    <CommentCardContainer>
      <CommentAvatar $foto={autor.foto} />

      <CommentBody>
        <CommentHeader>
          <CommentUserName
            onClick={() => navigate(`/perfil/${autor.username}`)}
            style={{ cursor: "pointer" }}
          >
            {displayName}
          </CommentUserName>
          <CommentUserHandle>@{autor.username}</CommentUserHandle>
          <ProfileIcon />
        </CommentHeader>

        <CommentText>{conteudo}</CommentText>

        <LikeBtn
          aria-label="Curtir comentário"
          $liked={liked}
          onClick={handleLike}
        >
          <LikeIcon />
          <LikeCount>{likesCount}</LikeCount>
        </LikeBtn>
      </CommentBody>
    </CommentCardContainer>
  );
}
