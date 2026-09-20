import type { UserSearchResult } from "../../../store/api/usersApi";
import { colors } from "../../../styles/colors";
import { FollowCard } from "../FollowCard";
import {
  FollowListWrapper,
  FollowListTitle,
  FollowListScroll,
  CloseButton,
  FollowListHeader,
} from "./styles";

interface FollowListProps {
  title: string;
  users: UserSearchResult[];
  isLoading: boolean;
  currentUsername: string | null;
  onClose: () => void;
}

export function FollowList({
  title,
  users,
  isLoading,
  currentUsername,
  onClose,
}: FollowListProps) {
  return (
    <FollowListWrapper>
      <FollowListHeader>
        <FollowListTitle>{title}</FollowListTitle>
        <CloseButton onClick={onClose} aria-label="Fechar">
          ✕
        </CloseButton>
      </FollowListHeader>

      {isLoading && (
        <p style={{ color: `${colors.gray}`, padding: "16px" }}>
          Carregando...
        </p>
      )}

      {!isLoading && users.length === 0 && (
        <p style={{ color: `${colors.gray}`, padding: "16px" }}>
          Nenhum usuário encontrado.
        </p>
      )}

      {!isLoading && users.length > 0 && (
        <FollowListScroll>
          {users.map((user) => (
            <FollowCard
              key={user.username}
              user={user}
              currentUsername={currentUsername}
            />
          ))}
        </FollowListScroll>
      )}
    </FollowListWrapper>
  );
}
