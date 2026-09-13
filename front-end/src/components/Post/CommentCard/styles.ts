import styled from "styled-components";
import { colors } from "../../../styles/colors";

export const CommentCardContainer = styled.article`
  display: flex;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid #2f2f2f;
`;

export const CommentAvatar = styled.div<{ $color: string }>`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  flex-shrink: 0;
`;

export const CommentBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
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
`;

export const LikeBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  padding: 0;
  margin-top: 8px;
  align-self: flex-end;
  transition: color 0.15s;

  &:hover {
    color: ${colors.white};
  }
`;

export const LikeCount = styled.span`
  font-size: 14px;
`;
