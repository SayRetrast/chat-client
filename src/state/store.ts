import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import accessTokenReducer from "./slices/accessToken.slice";
import { rootApi } from "./rootApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    accessToken: accessTokenReducer,
    [rootApi.reducerPath]: rootApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rootApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
