import {
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "../index";

const KEYS = {
  accessToken: "access",
  refreshToken: "refresh",
  username: "username",
} as const;

function safeRead(key: string): string | null {
  const value = localStorage.getItem(key);
  if (!value || value === "undefined" || value === "null") return null;
  return value;
}

interface AuthState {
  accessToken: string | null;
  username: string | null;
  nickname: string | null;
  foto: string | null;
  nSeguidores: number | null;
  nSeguindo: number | null;
}

export interface SetCredentialsPayload {
  accessToken: string;
  refreshToken: string;
  username: string;
}

export interface UserProfilePayload {
  username: string;
  nickname: string;
  foto: string | null;
  n_seguidores: number;
  n_seguindo: number;
  seguindo?: boolean;
}

const initialState: AuthState = {
  accessToken: safeRead(KEYS.accessToken),
  username: safeRead(KEYS.username),
  nickname: null,
  foto: null,
  nSeguidores: null,
  nSeguindo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setCredentials(state, action: PayloadAction<SetCredentialsPayload>) {
      const { accessToken, refreshToken, username } = action.payload;

      if (!accessToken || !refreshToken) {
        console.error("setCredentials: tokens ausentes", action.payload);
        return;
      }

      Object.values(KEYS).forEach((key) => localStorage.removeItem(key));

      state.accessToken = accessToken;
      state.username = username;
      state.nickname = null;
      state.foto = null;
      state.nSeguidores = null;
      state.nSeguindo = null;

      localStorage.setItem(KEYS.accessToken, accessToken);
      localStorage.setItem(KEYS.refreshToken, refreshToken);
      localStorage.setItem(KEYS.username, username);
    },

    setProfile(state, action: PayloadAction<UserProfilePayload>) {
      const { username, nickname, foto, n_seguidores, n_seguindo } =
        action.payload;
      state.username = username;
      state.nickname = nickname;
      state.foto = foto;
      state.nSeguidores = n_seguidores;
      state.nSeguindo = n_seguindo;
    },

    updateAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
      localStorage.setItem(KEYS.accessToken, action.payload);
    },

    logout(state) {
      state.accessToken = null;
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

const selectAuth = (state: RootState) => state.auth;

export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectIsAuthenticated = (state: RootState) =>
  !!state.auth.accessToken;

export const selectCurrentUser = createSelector([selectAuth], (auth) => ({
  username: auth.username,
}));

export const selectUserProfile = createSelector([selectAuth], (auth) => ({
  username: auth.username,
  nickname: auth.nickname,
  foto: auth.foto,
  nSeguidores: auth.nSeguidores,
  nSeguindo: auth.nSeguindo,
}));
