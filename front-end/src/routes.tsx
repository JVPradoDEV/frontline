import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "./store/slices/authSlice";
import { useCurrentUserProfile } from "./hooks/useCurrentUserProfile";
import { LoginPage } from "./pages/Login";
import { Cadastro } from "./pages/Cadastro";
import { FeedPage } from "./pages/Feed";
import { PostDetailPage } from "./pages/PostDetail";
import { ProfilePage } from "./pages/ProfilePage";
import { EncontrarPage } from "./pages/Buscar";

function ProtectedRoute() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  useCurrentUserProfile();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}

export function Raizes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/cadastro" element={<Cadastro />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/:postId" element={<PostDetailPage />} />
        <Route path="/perfil/:username" element={<ProfilePage />} />
        <Route path="/encontrar" element={<EncontrarPage />} />
      </Route>
    </Routes>
  );
}
