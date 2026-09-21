import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
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
} from "./styles";
import { assets } from "../../../styles/assets";
import { HomeIcon, SearchIcon, UserIcon } from "../../../styles/svgs";
import { selectUserProfile } from "../../../store/slices/authSlice";
import { useCurrentUserProfile } from "../../../hooks/useCurrentUserProfile";

const navItems = [
  { label: "Feed", icon: <HomeIcon />, to: "/feed" },
  { label: "Encontrar", icon: <SearchIcon />, to: "/encontrar" },
  { label: "Meu Perfil", icon: <UserIcon />, to: "/perfil/usuario" },
];

export function FeedSidebar() {
  const { pathname } = useLocation();
  useCurrentUserProfile();

  const { username, foto } = useSelector(selectUserProfile);

  // "Meu Perfil" aponta para o perfil do usuário logado
  const profilePath = `/perfil/${username || ""}`;

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

      <BottomSection>
        <UserAvatar $foto={foto} />
        <UserName>@{username || "Carregando..."}</UserName>
      </BottomSection>
    </FeedSideBarDiv>
  );
}
