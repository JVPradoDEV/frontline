import { useSelector, useDispatch } from "react-redux";
import {
  selectAccessToken,
  selectIsAuthenticated,
  selectCurrentUser,
  logout,
  selectUserProfile,
} from "../store/slices/authSlice";
import type { AppDispatch } from "../store";

export function useAuth() {
  const dispatch = useDispatch<AppDispatch>();

  return {
    accessToken: useSelector(selectAccessToken),
    isAuthenticated: useSelector(selectIsAuthenticated),
    user: useSelector(selectCurrentUser),
    profile: useSelector(selectUserProfile),
    logout: () => dispatch(logout()),
  };
}
