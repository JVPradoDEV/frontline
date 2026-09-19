import {
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "../index";

// ── Chaves do localStorage ─────────────────────────────────────────────────────
const KEYS = {
  accessToken: "access",
  refreshToken: "refresh",
  userId: "userId",
  username: "username",
} as const;

function safeRead(key: string): string | null {
  const value = localStorage.getItem(key);
  if (!value || value === "undefined" || value === "null") return null;
  return value;
}

// ── Tipos ──────────────────────────────────────────────────────────────────────
interface AuthState {
  accessToken: string | null;
  userId: number | null;
  username: string | null;
  // Perfil do usuário logado
  nickname: string | null;
  foto: string | null;
  nSeguidores: number | null;
  nSeguindo: number | null;
}

export interface SetCredentialsPayload {
  accessToken: string;
  refreshToken: string;
  userId: number;
  username: string;
}

export interface UserProfilePayload {
  username: string;
  nickname: string;
  foto: string | null;
  n_seguidores: number;
  n_seguindo: number;
}

// ── Reidrata do localStorage (persiste entre refreshes de página) ──────────────
const initialState: AuthState = {
  accessToken: safeRead(KEYS.accessToken),
  userId: Number(safeRead(KEYS.userId)) || null,
  username: safeRead(KEYS.username),
  nickname: null,
  foto: null,
  nSeguidores: null,
  nSeguindo: null,
};

// ── Slice ──────────────────────────────────────────────────────────────────────
const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    // Login / Cadastro: salva tudo no Redux + localStorage
    setCredentials(state, action: PayloadAction<SetCredentialsPayload>) {
      const { accessToken, refreshToken, userId, username } = action.payload;
      if (!accessToken || !refreshToken) {
        console.error(
          "setCredentials: tokens ausentes na resposta da API",
          action.payload,
        );
        return;
      }
      // 1. LIMPEZA: Remove qualquer dado antigo do localStorage para evitar conflitos
      Object.values(KEYS).forEach((key) => localStorage.removeItem(key));

      // 2. REDUX: Atualiza o estado global
      state.accessToken = accessToken;
      state.userId = userId;
      state.username = username;
      // Reseta o perfil para forçar o fetch dos dados do novo usuário
      state.nickname = null;
      state.foto = null;
      state.nSeguidores = null;
      state.nSeguindo = null;

      // 3. STORAGE: Adiciona os novos valores recebidos da API
      localStorage.setItem(KEYS.accessToken, accessToken);
      localStorage.setItem(KEYS.refreshToken, refreshToken);
      localStorage.setItem(KEYS.userId, String(userId));
      localStorage.setItem(KEYS.username, username);
    },

    // Chamado automaticamente pelo onQueryStarted do getUserProfile
    setProfile(state, action: PayloadAction<UserProfilePayload>) {
      const { username, nickname, foto, n_seguidores, n_seguindo } =
        action.payload;
      state.username = username;
      state.nickname = nickname;
      state.foto = foto;
      state.nSeguidores = n_seguidores;
      state.nSeguindo = n_seguindo;
    },

    // Renovação silenciosa: só o accessToken muda
    updateAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
      localStorage.setItem(KEYS.accessToken, action.payload);
    },

    // Logout: limpa Redux + todo o localStorage de auth
    logout(state) {
      state.accessToken = null;
      state.userId = null;
      state.username = null;
      state.nickname = null;
      state.foto = null;
      state.nSeguidores = null;
      state.nSeguindo = null;
      Object.values(KEYS).forEach((key) => localStorage.removeItem(key));
    },
  },
});

export const { setCredentials, setProfile, updateAccessToken, logout } =
  authSlice.actions;
export default authSlice.reducer;

// ── Selectors ──────────────────────────────────────────────────────────────────
const selectAuth = (state: RootState) => state.auth;

export const selectAccessToken = (state: RootState) => state.auth.accessToken;

export const selectIsAuthenticated = (state: RootState) =>
  !!state.auth.accessToken;

// Usando createSelector para memoizar o resultado e evitar re-renderizações infinitas
export const selectCurrentUser = createSelector([selectAuth], (auth) => ({
  userId: auth.userId,
  username: auth.username,
}));

// Memoizando o perfil do usuário também
export const selectUserProfile = createSelector([selectAuth], (auth) => ({
  username: auth.username,
  nickname: auth.nickname,
  foto: auth.foto,
  nSeguidores: auth.nSeguidores,
  nSeguindo: auth.nSeguindo,
}));
