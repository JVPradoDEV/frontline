import styled from "styled-components";
import { colors } from "../../../styles/colors";

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

export const ModalCard = styled.div`
  background-color: ${colors.black};
  border: 1px solid ${colors.anotherHim};
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 16px;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: ${colors.white};
`;

export const ModalSubtitle = styled.p`
  margin: 0;
  font-size: 15px;
  color: #888;
  line-height: 1.5;
`;

export const ModalInput = styled.input`
  width: 100%;
  background-color: ${colors.black};
  border: 1px solid ${colors.anotherHim};
  border-radius: 8px;
  padding: 12px 16px;
  color: ${colors.white};
  font-size: 15px;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.15s;

  &::placeholder {
    color: #555;
  }

  &:focus {
    border-color: ${colors.white};
  }
`;

export const ModalActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
`;

export const ConfirmButton = styled.button`
  width: 100%;
  padding: 12px;
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

export const SkipButton = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 9999px;
  background-color: transparent;
  color: ${colors.white};
  font-weight: 600;
  font-size: 15px;
  border: 1px solid ${colors.anotherHim};
  cursor: pointer;
  transition: background-color 0.15s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;
