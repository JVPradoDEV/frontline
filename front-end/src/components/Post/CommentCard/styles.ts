import styled from "styled-components";
import { colors } from "../../../styles/colors";
import { Avatar } from "../../shared/Avatar";

export const CommentCardContainer = styled.article`
  display: flex;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid ${colors.anotherHim};
`;

export const CommentAvatar = styled(Avatar).attrs({ $size: 42 })``;

export const CommentBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CommentUserName = styled.span`
  font-weight: 700;
  font-size: 15px;
  color: ${colors.white};
`;

export const CommentUserHandle = styled.span`
  font-size: 14px;
  color: #888;
`;

export const CommentText = styled.p`
  margin: 0;
  font-size: 15px;
  line-height: 1.5;
  color: ${colors.white};

  word-break: break-word;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
`;

export const LikeBtn = styled.button<{ $liked?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: ${({ $liked }) =>
    $liked ? `${colors.lightRed}` : `${colors.mockColor}`};
  cursor: pointer;
  padding: 0;
  margin-top: 8px;
  align-self: flex-end;
  transition: color 0.15s;

  &:hover {
    color: ${({ $liked }) =>
      $liked ? `${colors.lightRed}` : `${colors.white}`};
  }
`;

export const LikeCount = styled.span`
  font-size: 14px;
`;
