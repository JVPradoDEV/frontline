import styled from "styled-components";
import { colors } from "../../../styles/colors";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px 16px;
  background-color: ${colors.black};
  border: 1px solid ${colors.white};
  border-radius: 20px;
  text-align: center;
`;

export const CardAvatar = styled.div<{ $foto?: string }>`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: ${colors.mockColor};
  background-image: ${({ $foto }) => ($foto ? `url(${$foto})` : "none")};
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
`;

export const CardHandle = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${colors.white};
`;

export const CardStats = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  width: 100%;
`;

export const StatCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

export const StatLabel = styled.span`
  font-size: 12px;
  color: ${colors.mockColor};
`;

export const StatValue = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: ${colors.white};
`;

export const ViewProfileButton = styled.button`
  padding: 6px 18px;
  border-radius: 9999px;
  background-color: transparent;
  color: ${colors.white};
  font-size: 13px;
  font-weight: 600;
  border: 1px solid ${colors.white};
  cursor: pointer;
  transition:
    background-color 0.15s,
    color 0.15s;

  &:hover {
    background-color: ${colors.white};
    color: ${colors.black};
  }
`;
