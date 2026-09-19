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
} from "./styles";

export function UserCard({
  username,
  seguidores,
  seguindo,
  foto,
}: UserSearchResult) {
  const navigate = useNavigate();

  return (
    <CardContainer>
      <CardAvatar $foto={foto} />
      <CardHandle>@{username}</CardHandle>

      <CardStats>
        <StatCol>
          <StatLabel>Seguidores</StatLabel>
          <StatValue>{seguidores}</StatValue>
        </StatCol>
        <StatCol>
          <StatLabel>Seguindo</StatLabel>
          <StatValue>{seguindo}</StatValue>
        </StatCol>
      </CardStats>

      <ViewProfileButton onClick={() => navigate(`/perfil/${username}`)}>
        Ver Perfil
      </ViewProfileButton>
    </CardContainer>
  );
}
