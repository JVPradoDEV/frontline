import { useLocation, Link } from "react-router-dom";
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

// ── Ícones SVG inline ────────────────────────────────────────────────────────
const HomeIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9,22 9,12 15,12 15,22" />
  </svg>
);

const SearchIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const UserIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
// ────────────────────────────────────────────────────────────────────────────

const navItems = [
  { label: "Feed", icon: <HomeIcon />, to: "/feed" },
  { label: "Encontrar", icon: <SearchIcon />, to: "/encontrar" },
  { label: "Meu Perfil", icon: <UserIcon />, to: "/perfil" },
];

export function FeedSidebar() {
  const { pathname } = useLocation();

  return (
    <FeedSideBarDiv>
      {/* Topo: logo + navegação */}
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
            {navItems.map(({ label, icon, to }) => (
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

      {/* Rodapé: info do usuário logado */}
      <BottomSection>
        <UserAvatar />
        <UserName>@usuario</UserName>
      </BottomSection>
    </FeedSideBarDiv>
  );
}
