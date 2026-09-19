import type { UserProfilePayload } from "../../../store/slices/authSlice";
import { colors } from "../../../styles/colors";
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

interface ProfileHeaderProps {
  user: UserProfilePayload;
  isOwnProfile: boolean;
}

export function ProfileHeader({ user, isOwnProfile }: ProfileHeaderProps) {
  const displayName = user.nickname || user.username;

  return (
    <ProfileHeaderContainer>
      {/* Banner com avatar sobreposto */}
      <BannerSection>
        <AvatarWrapper>
          <ProfileAvatar $color={colors.mockColor} />
        </AvatarWrapper>
      </BannerSection>

      {/* Info abaixo do banner */}
      <ProfileInfoSection>
        <ProfileUserName>{displayName}</ProfileUserName>
        <ProfileUserHandle>@{user.username}</ProfileUserHandle>

        <StatsRow>
          <StatItem>
            <StatLabel>Seguidores:</StatLabel>
            <StatValue>{user.n_seguidores}</StatValue>
          </StatItem>

          <ActionButton>
            {isOwnProfile ? "Editar Perfil" : "Seguir"}
          </ActionButton>

          <StatItem>
            <StatLabel>Seguindo:</StatLabel>
            <StatValue>{user.n_seguindo}</StatValue>
          </StatItem>
        </StatsRow>
      </ProfileInfoSection>
    </ProfileHeaderContainer>
  );
}
