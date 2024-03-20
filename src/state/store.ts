import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import accessTokenReducer from "./slices/accessToken.slice";

export const store = configureStore({
  reducer: { user: userReducer, accessToken: accessTokenReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
