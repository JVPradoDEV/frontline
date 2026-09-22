import { useSelector } from "react-redux";
import { useGetUserProfileQuery } from "../store/api/usersApi";
import { selectIsAuthenticated } from "../store/slices/authSlice";

export function useCurrentUserProfile() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useGetUserProfileQuery(undefined, {
    skip: !isAuthenticated,
  });
}
