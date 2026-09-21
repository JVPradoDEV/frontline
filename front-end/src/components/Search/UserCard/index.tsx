import { useNavigate } from "react-router-dom";
import type { UserSearchResult } from "../../../store/api/usersApi";
import {
  CardContainer,
  CardAvatar,
  CardHandle,
  CardStats,
  StatCol,
  StatLabel,
  StatValue,
  ViewProfileButton,
  CardTitle,
} from "./styles";

export function UserCard({
  username,
  n_seguidores,
  n_seguindo,
  nickname,
  foto,
}: UserSearchResult) {
  const navigate = useNavigate();

  return (
    <CardContainer>
      <CardAvatar $foto={foto} />
      <CardTitle>{nickname}</CardTitle>
      <CardHandle>@{username}</CardHandle>

      <CardStats>
        <StatCol>
          <StatLabel>Seguidores</StatLabel>
          <StatValue>{n_seguidores}</StatValue>
        </StatCol>
        <StatCol>
          <StatLabel>Seguindo</StatLabel>
          <StatValue>{n_seguindo}</StatValue>
        </StatCol>
      </CardStats>

      <ViewProfileButton onClick={() => navigate(`/perfil/${username}`)}>
        Ver Perfil
      </ViewProfileButton>
    </CardContainer>
  );
}
