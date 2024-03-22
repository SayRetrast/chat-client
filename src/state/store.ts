import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import accessTokenReducer from "./slices/accessToken.slice";
import { authApi } from "./services/auth.service";

export const store = configureStore({
  reducer: { user: userReducer, accessToken: accessTokenReducer, [authApi.reducerPath]: authApi.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
