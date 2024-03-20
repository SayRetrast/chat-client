import { useCallback, useEffect } from "react";
import Router from "./components/router";
import { BrowserRouter } from "react-router-dom";

import { authAPI } from "./api/auth/auth.api";
import { DecodedJwtType } from "./types/decodedJwt.type";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setAccessToken } from "./state/slices/accessToken.slice";
import { setUser } from "./state/slices/user.slice";

export default function App() {
  const dispatch = useDispatch();

  const authHandler = useCallback(async () => {
    const { accessToken } = await authAPI();
    if (!accessToken) {
      throw new Error("Could not authorize.");
    }
    dispatch(setAccessToken(accessToken));

    const decodedJwt: DecodedJwtType = jwtDecode(accessToken);
    const userData = { id: decodedJwt.sub, username: decodedJwt.username };
    dispatch(setUser({ id: userData.id, username: userData.username }));
  }, [dispatch]);

  useEffect(() => {
    authHandler();
  }, [authHandler]);

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}
