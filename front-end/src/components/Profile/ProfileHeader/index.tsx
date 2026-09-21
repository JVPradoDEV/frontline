import { useState } from "react";
import type { UserProfilePayload } from "../../../store/slices/authSlice";
import { colors } from "../../../styles/colors";
import {
  useFollowMutation,
  useUnfollowMutation,
} from "../../../store/api/usersApi";
import {
  ProfileHeaderContainer,
  BannerSection,
  AvatarWrapper,
  ProfileAvatar,
  ProfileInfoSection,
  ProfileUserName,
  ProfileUserHandle,
  StatsRow,
  StatItem,
  StatLabel,
  StatValue,
  ActionButton,
} from "./styles";

type ActiveTab = "seguidores" | "seguindo" | null;

interface ProfileHeaderProps {
  user: UserProfilePayload;
  isOwnProfile: boolean;
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export function ProfileHeader({
  user,
  isOwnProfile,
  activeTab,
  onTabChange,
}: ProfileHeaderProps) {
  const displayName = user.nickname || user.username;

  const [following, setFollowing] = useState(user.seguindo ?? false);
  const [followersCount, setFollowersCount] = useState(user.n_seguidores);

  const [follow] = useFollowMutation();
  const [unfollow] = useUnfollowMutation();

  async function handleFollow() {
    try {
      if (following) {
        setFollowing(false);
        setFollowersCount((c) => c - 1);
        await unfollow({ alvo: user.username }).unwrap();
      } else {
        setFollowing(true);
        setFollowersCount((c) => c + 1);
        await follow({ alvo: user.username }).unwrap();
      }
    } catch {
      setFollowing(user.seguindo || false);
      setFollowersCount(user.n_seguidores);
      console.error("Erro ao seguir/desseguir usuário.");
    }
  }

  function handleTabClick(tab: ActiveTab) {
    onTabChange(activeTab === tab ? null : tab);
  }

  return (
    <ProfileHeaderContainer>
      <BannerSection>
        <AvatarWrapper>
          <ProfileAvatar $color={colors.mockColor} />
        </AvatarWrapper>
      </BannerSection>

      <ProfileInfoSection>
        <ProfileUserName>{displayName}</ProfileUserName>
        <ProfileUserHandle>@{user.username}</ProfileUserHandle>

        <StatsRow>
          <StatItem
            onClick={() => handleTabClick("seguidores")}
            $active={activeTab === "seguidores"}
          >
            <StatLabel>Seguidores:</StatLabel>
            <StatValue>{followersCount}</StatValue>
          </StatItem>

          {isOwnProfile ? (
            <ActionButton>Editar Perfil</ActionButton>
          ) : (
            <ActionButton onClick={handleFollow} $following={following}>
              {following ? "Seguindo" : "Seguir"}
            </ActionButton>
          )}

          <StatItem
            onClick={() => handleTabClick("seguindo")}
            $active={activeTab === "seguindo"}
          >
            <StatLabel>Seguindo:</StatLabel>
            <StatValue>{user.n_seguindo}</StatValue>
          </StatItem>
        </StatsRow>
      </ProfileInfoSection>
    </ProfileHeaderContainer>
  );
}
