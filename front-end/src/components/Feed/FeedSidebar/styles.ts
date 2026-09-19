import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "../../../styles/colors";
import { SideContainer } from "../../../styles/mainstyle";

// ── Container principal da sidebar ────────────────────────────────────────────
export const FeedSideBarDiv = styled(SideContainer)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 220px;
  height: 100vh;
  padding: 24px 16px;

  position: fixed;
  left: 0;
  top: 0;

  background-color: ${colors.black};
  border-right: 1px solid ${colors.anotherHim};
  color: ${colors.white};
`;

// ── Logo ──────────────────────────────────────────────────────────────────────
export const LogoSection = styled.div`
  margin-bottom: 32px;
  padding: 0 8px;
`;

export const LogoMark = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
`;

// ── Navegação ─────────────────────────────────────────────────────────────────
export const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const NavItem = styled(Link)<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  border-radius: 9999px;
  color: ${colors.white};
  text-decoration: none;
  font-size: 18px;
  font-weight: ${({ $isActive }) => ($isActive ? "700" : "400")};
  transition: background-color 0.15s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }
`;

export const NavIcon = styled.span`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

export const NavLabel = styled.span`
  line-height: 1;
`;

// ── Rodapé ─────────────────────────────────────────────────────────────────────
export const BottomSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 9999px;
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }
`;

export const UserAvatar = styled.div<{ $foto?: string | null }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #555;
  background-image: ${({ $foto }) => ($foto ? `url(${$foto})` : "none")};
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
`;

export const UserName = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${colors.white};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
