import styled from "styled-components";
import { colors } from "../../../styles/colors";
import { Avatar } from "../../shared/Avatar";

export const PostFocusContainer = styled.div`
  padding: 20px 16px;
  border-bottom: 1px solid rgb(47, 47, 47);
`;

export const FocusHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

export const FocusAvatar = styled(Avatar).attrs({ $size: 50 })``;

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

  word-break: break-word;
  overflow-wrap: anywhere;
  overflow: hidden;
`;

export const FocusLikeBtn = styled.button<{ $liked?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ $liked }) => ($liked ? colors.lightRed : colors.gray)};
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${colors.lightRed};

    svg {
      transform: scale(1.1);
    }
  }

  svg {
    width: 28px;
    height: 28px;
    fill: ${({ $liked }) => ($liked ? colors.lightRed : "none")};
    stroke: ${({ $liked }) => ($liked ? colors.lightRed : "currentColor")};
    transition: transform 0.2s ease-in-out;
  }
`;

export const FocusLikeCount = styled.span`
  font-size: 16px;
  font-weight: 600;
`;
