import styled from "styled-components";
import { colors } from "../../../styles/colors";

export const FollowListWrapper = styled.div`
  border-bottom: 1px solid #2f2f2f;
  padding: 16px;
  animation: slideDown 0.2s ease;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const FollowListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const FollowListTitle = styled.h3`
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: ${colors.white};
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: #888;
  font-size: 16px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 50%;
  transition:
    color 0.15s,
    background-color 0.15s;

  &:hover {
    color: ${colors.white};
    background-color: rgba(255, 255, 255, 0.08);
  }
`;

// Scroll horizontal — carousel
export const FollowListScroll = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;

  /* Esconde scrollbar mas mantém funcional */
  scrollbar-width: thin;
  scrollbar-color: ${colors.darkGray} transparent;

  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.darkGray};
    border-radius: 4px;
  }
`;
