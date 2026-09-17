import styled from "styled-components";
import { colors } from "../../../styles/colors";

export const PostFocusContainer = styled.div`
  padding: 20px 16px;
  border-bottom: 1px solid rgb(47, 47, 47);
`;

export const FocusHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

export const FocusAvatar = styled.div<{ $color: string }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  flex-shrink: 0;
`;

export const FocusUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const FocusUserName = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: ${colors.white};
  text-decoration: underline;
`;

export const FocusUserHandle = styled.span`
  font-size: 14px;
  color: #888;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const FocusContent = styled.p`
  margin: 0;
  font-size: 26px;
  font-weight: 700;
  color: ${colors.white};
  line-height: 1.4;
`;
