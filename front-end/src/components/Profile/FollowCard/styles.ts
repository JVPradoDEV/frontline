import styled from "styled-components";
import { colors } from "../../../styles/colors";

export const FollowCardContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid ${colors.anotherHim};
  background-color: ${colors.black};
  min-width: 260px;
  cursor: pointer;
  flex-shrink: 0;
  transition: background-color 0.15s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.04);
  }
`;

export const FollowAvatar = styled.div<{ $foto?: string | null }>`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: ${colors.mockColor};
  background-image: ${({ $foto }) => ($foto ? `url(${$foto})` : "none")};
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
`;

export const FollowInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: hidden;
`;

export const FollowName = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${colors.white};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const FollowHandle = styled.span`
  font-size: 13px;
  color: ${colors.mockColor};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const FollowButton = styled.button<{ $following?: boolean }>`
  padding: 6px 14px;
  border-radius: 9999px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s;
  flex-shrink: 0;
  background-color: transparent;
  color: ${({ $following }) =>
    $following ? `${colors.mockColor}` : colors.white};
  border: 1.5px solid
    ${({ $following }) => ($following ? `${colors.mockColor}` : colors.white)};

  &:hover {
    background-color: ${({ $following }) =>
      $following ? "rgba(224,82,82,0.1)" : colors.white};
    color: ${({ $following }) =>
      $following ? `${colors.lightRed}` : colors.black};
    border-color: ${({ $following }) =>
      $following ? `${colors.lightRed}` : colors.white};
  }
`;
