import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import {
  FeedSideBarDiv,
  LogoSection,
  LogoMark,
  NavList,
  NavItem,
  NavIcon,
  NavLabel,
  BottomSection,
  UserAvatar,
  UserName,
  LogoutPopup,
  LogoutButton,
} from "./styles";
import { assets } from "../../../styles/assets";
import {
  HomeIcon,
  LogoutIcon,
  SearchIcon,
  UserIcon,
} from "../../../styles/svgs";
import { selectUserProfile } from "../../../store/slices/authSlice";
import { useCurrentUserProfile } from "../../../hooks/useCurrentUserProfile";
import { useAuth } from "../../../hooks/useAuth";

const navItems = [
  { label: "Feed", icon: <HomeIcon />, to: "/feed" },
  { label: "Encontrar", icon: <SearchIcon />, to: "/encontrar" },
  { label: "Meu Perfil", icon: <UserIcon />, to: "/perfil/usuario" },
];

export function FeedSidebar() {
  const { pathname } = useLocation();
  const { logout } = useAuth();
  const [showLogout, setShowLogout] = useState(false);
  useCurrentUserProfile();

  const { username, foto } = useSelector(selectUserProfile);

  // "Meu Perfil" aponta para o perfil do usuário logado
  const profilePath = `/perfil/${username || ""}`;

  function handleLogout() {
    logout();
    setShowLogout(false);
  }

  const navItemsWithProfile = navItems.map((item) =>
    item.label === "Meu Perfil" ? { ...item, to: profilePath } : item,
  );
  return (
    <FeedSideBarDiv>
      <div>
        <LogoSection>
          <Link to="/feed" style={{ textDecoration: "none" }}>
            <LogoMark>
              <img src={assets.logo2} />
            </LogoMark>
          </Link>
        </LogoSection>

        <nav>
          <NavList>
            {navItemsWithProfile.map(({ label, icon, to }) => (
              <li key={label}>
                <NavItem to={to} $isActive={pathname === to}>
                  <NavIcon>{icon}</NavIcon>
                  <NavLabel>{label}</NavLabel>
                </NavItem>
              </li>
            ))}
          </NavList>
        </nav>
      </div>

      <div style={{ position: "relative" }}>
        {/* Popup aparece acima do botão */}
        {showLogout && (
          <>
            {/* Overlay invisível para fechar ao clicar fora */}
            <div
              style={{ position: "fixed", inset: 0, zIndex: 10 }}
              onClick={() => setShowLogout(false)}
            />
            <LogoutPopup>
              <LogoutButton onClick={handleLogout}>
                <LogoutIcon />
                Sair da conta
              </LogoutButton>
            </LogoutPopup>
          </>
        )}

        <BottomSection
          onClick={() => setShowLogout((prev) => !prev)}
          $active={showLogout}
        >
          <UserAvatar $foto={foto} />
          <UserName>{username}</UserName>
        </BottomSection>
      </div>
    </FeedSideBarDiv>
  );
}
