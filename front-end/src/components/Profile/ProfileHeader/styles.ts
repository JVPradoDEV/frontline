import styled from "styled-components";
import { colors } from "../../../styles/colors";
import { assets } from "../../../styles/assets";

export const ProfileHeaderContainer = styled.div`
  border-bottom: 1px solid ${colors.darkGray};
`;

export const BannerSection = styled.div`
  width: 100%;
  height: 160px;
  position: relative;
  overflow: visible;
  background-image: url(${assets.backgroundPerfil});
`;

// Wrapper posicionado na borda inferior do banner
export const AvatarWrapper = styled.div`
  position: absolute;
  bottom: -44px;
  left: 50%;
  transform: translateX(-50%);
`;

export const ProfileAvatar = styled.div<{ $color: string }>`
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  border: 3px solid ${colors.black};
`;

export const ProfileInfoSection = styled.div`
  padding: 56px 16px 20px; /* padding-top = metade do avatar + gap */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const ProfileUserName = styled.h1`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: ${colors.white};
`;

export const ProfileUserHandle = styled.span`
  font-size: 14px;
  color: #888;
`;

export const StatsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 12px;
`;

export const StatItem = styled.div<{ $active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 8px;
  transition: background-color 0.15s;
  background-color: ${({ $active }) =>
    $active ? "rgba(255,255,255,0.08)" : "transparent"};

  &:hover {
    background-color: rgba(255, 255, 255, 0.06);
  }
`;

export const StatLabel = styled.span`
  font-size: 13px;
  color: #888;
`;

export const StatValue = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: ${colors.white};
`;

export const ActionButton = styled.button<{ $following?: boolean }>`
  padding: 8px 20px;
  border-radius: 9999px;
  background-color: ${({ $following }) =>
    $following ? "transparent" : "transparent"};
  color: ${({ $following }) => ($following ? `${colors.mockColor}` : "white")};
  font-weight: 700;
  font-size: 15px;
  border: 2px solid
    ${({ $following }) => ($following ? `${colors.mockColor}` : "white")};
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background-color: ${({ $following }) =>
      $following ? "rgba(224,82,82,0.1)" : "white"};
    color: ${({ $following }) => ($following ? `${colors.lightRed}` : "black")};
    border-color: ${({ $following }) =>
      $following ? `${colors.lightRed}` : "white"};
  }
`;
