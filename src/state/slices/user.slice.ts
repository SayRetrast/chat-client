import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id?: string | null;
  username?: string | null;
  isAuth: boolean;
}

const initialState: UserState = {
  id: null,
  username: null,
  isAuth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ id: string; username: string }>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.isAuth = true;
    },
    cleanUser: (state) => {
      state.id = null;
      state.username = null;
      state.isAuth = false;
    },
  },
});

export const { setUser, cleanUser } = userSlice.actions;

export default userSlice.reducer;
