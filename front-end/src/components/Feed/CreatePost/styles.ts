import styled from "styled-components";
import { colors } from "../../../styles/colors";

export const CreatePostContainer = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid rgb(47, 47, 47);
`;

export const SelfAvatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: #555;
  flex-shrink: 0;
`;

export const InputWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
`;

export const PostTextarea = styled.textarea`
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  resize: none;
  color: ${colors.white};
  font-size: 16px;
  line-height: 1.5;

  word-break: break-word;
  overflow-wrap: anywhere;
  overflow: hidden;

  &::placeholder {
    color: #555;
  }
`;

export const PostFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const PostButton = styled.button`
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
