import styled from "styled-components";
import { colors } from "../../../styles/colors";

export const PostCardContainer = styled.article`
  display: flex;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid ${colors.anotherHim};
  cursor: pointer;
  transition: background-color 0.15s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.03);
  }
`;

export const PostAvatar = styled.div<{ $color: string }>`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  flex-shrink: 0;
`;

export const PostBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #888;
`;

export const PostUserName = styled.span`
  font-weight: 700;
  font-size: 15px;
  color: ${colors.white};
`;

export const PostUserHandle = styled.span`
  font-size: 14px;
  color: #888;
`;

export const PostText = styled.p`
  margin: 0;
  font-size: 15px;
  line-height: 1.5;
  color: ${colors.white};

  word-break: break-word;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
`;

export const PostActions = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 8px;
`;

export const ActionBtn = styled.button<{ $liked?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: ${({ $liked }) =>
    $liked ? `${colors.lightRed}` : `${colors.mockColor}`};
  cursor: pointer;
  padding: 0;
  transition: color 0.15s;

  &:hover {
    color: ${({ $liked }) => ($liked ? `${colors.lightRed}` : "white")};
  }
`;

export const ActionCount = styled.span`
  font-size: 14px;
`;
