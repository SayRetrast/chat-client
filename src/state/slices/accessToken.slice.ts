import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AccessTokenState {
  accessToken?: string | null;
}

const initialState: AccessTokenState = {
  accessToken: null,
};

export const accessTokenSlice = createSlice({
  name: "accessToken",
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    cleanAccessToken(state) {
      state.accessToken = null;
    },
  },
});

export const { setAccessToken, cleanAccessToken } = accessTokenSlice.actions;

export default accessTokenSlice.reducer;
