import { useSelector } from "react-redux";
import { useGetUserProfileQuery } from "../store/api/usersApi";
import {
  selectIsAuthenticated,
  selectCurrentUser,
} from "../store/slices/authSlice";

export function useCurrentUserProfile() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { username } = useSelector(selectCurrentUser);

  console.log("Auth:", isAuthenticated, "User:", username);

  // skip garante que só busca quando há usuário logado
  // RTK Query faz cache: não repete a requisição desnecessariamente
  useGetUserProfileQuery(undefined, {
    skip: !isAuthenticated,
  });
}
