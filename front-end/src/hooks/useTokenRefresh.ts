import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  updateAccessToken,
  selectIsAuthenticated,
} from "../store/slices/authSlice";
import type { AppDispatch } from "../store";
import { BASE_URL } from "../store/api/constants";

const FIVE_MINUTES = 5 * 60 * 1000;

export function useTokenRefresh() {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) return;

    async function tryRefresh() {
      const storedRefresh = localStorage.getItem("refresh");

      // ── Não tenta renovar se o valor for inválido ──────────────────────
      if (!storedRefresh || storedRefresh === "undefined") {
        dispatch(logout());
        return;
      }

      try {
        const res = await fetch(`${BASE_URL}/refresh/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh: storedRefresh }),
        });

        if (!res.ok) throw new Error("Token inválido");

        const { access } = await res.json();
        dispatch(updateAccessToken(access));
      } catch {
        dispatch(logout());
      }
    }

    tryRefresh();
    const interval = setInterval(tryRefresh, FIVE_MINUTES);
    return () => clearInterval(interval);
  }, [isAuthenticated, dispatch]);
}
