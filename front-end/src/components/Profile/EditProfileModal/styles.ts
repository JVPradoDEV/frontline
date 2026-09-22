import styled from "styled-components";
import { colors } from "../../../styles/colors";

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
`;

export const ModalCard = styled.div`
  background-color: ${colors.black};
  border: 1px solid ${colors.white};
  border-radius: 20px;
  padding: 32px 28px;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 16px;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: ${colors.white};
  text-align: center;
  line-height: 1.5;
`;

export const ModalSubtitle = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${colors.gray};
  text-align: center;
`;

export const AvatarButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  border-radius: 50%;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.75;
  }
`;

export const ModalAvatar = styled.div<{ $foto?: string | null }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${colors.mockColor};
  background-image: ${({ $foto }) => ($foto ? `url(${$foto})` : "none")};
  background-size: cover;
  background-position: center;
`;

export const Field = styled.div`
  width: 100%;
  border: 1px solid ${colors.white};
  border-radius: 8px;
  padding: 12px 16px;
  box-sizing: border-box;
`;

export const FieldLabel = styled.label`
  display: block;
  font-size: 12px;
  color: ${colors.gray};
  margin-bottom: 4px;
`;

export const FieldInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: ${colors.white};
  font-size: 16px;
  font-weight: 600;
  box-sizing: border-box;

  &::placeholder {
    color: ${colors.mockColor};
  }
`;

export const ChangePasswordBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: 1.5px solid ${colors.white};
  border-radius: 9999px;
  color: ${colors.white};
  font-size: 15px;
  font-weight: 600;
  padding: 10px 24px;
  cursor: pointer;
  transition:
    background-color 0.15s,
    color 0.15s;

  &:hover {
    background-color: ${colors.white};
    color: ${colors.black};
  }
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  justify-content: center;
`;

export const ModalBtn = styled.button<{ $secondary?: boolean }>`
  flex: 1;
  padding: 12px;
  border-radius: 9999px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.15s;
  border: 1.5px solid ${colors.white};
  background-color: ${({ $secondary }) =>
    $secondary ? "transparent" : colors.white};
  color: ${({ $secondary }) => ($secondary ? colors.white : colors.black)};

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  &:hover:not(:disabled) {
    opacity: 0.85;
  }
`;
