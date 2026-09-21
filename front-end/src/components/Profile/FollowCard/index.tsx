import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { UserSearchResult } from "../../../store/api/usersApi";
import {
  useFollowMutation,
  useUnfollowMutation,
} from "../../../store/api/usersApi";
import {
  FollowCardContainer,
  FollowAvatar,
  FollowInfo,
  FollowName,
  FollowHandle,
  FollowButton,
} from "./styles";

interface FollowCardProps {
  user: UserSearchResult;
  currentUsername: string | null;
}

export function FollowCard({ user, currentUsername }: FollowCardProps) {
  const navigate = useNavigate();
  const displayName = user.nickname || user.username;

  const isOwnCard = user.username === currentUsername;

  const [following, setFollowing] = useState(user.seguindo);
  const [follow] = useFollowMutation();
  const [unfollow] = useUnfollowMutation();

  async function handleFollow(e: React.MouseEvent) {
    e.stopPropagation();
    try {
      if (following) {
        await unfollow({ alvo: user.username }).unwrap();
      } else {
        await follow({ alvo: user.username }).unwrap();
      }
      setFollowing((prev) => !prev);
    } catch {
      console.error("Erro ao seguir/desseguir.");
    }
  }

  return (
    <FollowCardContainer onClick={() => navigate(`/perfil/${user.username}`)}>
      <FollowAvatar $foto={user.foto} />

      <FollowInfo>
        <FollowName>{displayName}</FollowName>
        <FollowHandle>@{user.username}</FollowHandle>
      </FollowInfo>

      {!isOwnCard && (
        <FollowButton $following={following} onClick={handleFollow}>
          {following ? "Seguindo" : "Seguir"}
        </FollowButton>
      )}
    </FollowCardContainer>
  );
}
