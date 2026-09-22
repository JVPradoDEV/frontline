import styled from "styled-components";
import { colors } from "../../../styles/colors";
import { Avatar } from "../../shared/Avatar";

export const CreateCommentContainer = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid rgb(47, 47, 47);
`;

export const CommentAvatar = styled(Avatar).attrs({ $size: 42 })``;

export const ErrorMessage = styled.span`
  color: ${colors.lightRed};
  font-size: 14px;
  margin-top: -4px;
  margin-bottom: 4px;
`;

export const InputWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CommentTextarea = styled.textarea`
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  resize: none;
  color: ${colors.white};
  font-size: 16px;
  line-height: 1.5;

  &::placeholder {
    color: ${colors.gray};
  }
`;

export const CommentFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const CommentButton = styled.button`
  padding: 8px 20px;
  border-radius: 9999px;
  background-color: ${colors.white};
  color: ${colors.black};
  font-weight: 700;
  font-size: 15px;
  border: none;
  cursor: pointer;
  transition: opacity 0.15s;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    opacity: 0.85;
  }
`;
