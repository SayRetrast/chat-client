import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import accessTokenReducer from "./slices/accessToken.slice";
import { authApi } from "./services/auth.service";
import { rootApi } from "./rootApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    accessToken: accessTokenReducer,
    [rootApi.reducerPath]: rootApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
