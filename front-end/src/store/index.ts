import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { usersApi } from "./api/usersApi"; // ← novo
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer, // ← novo
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(usersApi.middleware), // ← novo
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
