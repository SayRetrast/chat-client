import { useCallback, useEffect } from "react";
import Router from "./components/router";
import { BrowserRouter } from "react-router-dom";
import { DecodedJwtType } from "./types/decodedJwt.type";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setAccessToken } from "./state/slices/accessToken.slice";
import { setUser } from "./state/slices/user.slice";
import { useAuthMutation } from "./state/services/auth.service";

export default function App() {
  const dispatch = useDispatch();
  const [auth, { isUninitialized, isLoading }] = useAuthMutation();

  const authHandler = useCallback(async () => {
    const { accessToken } = await auth().unwrap();
    if (!accessToken) {
      throw new Error("Could not authorize.");
    }
    dispatch(setAccessToken(accessToken));

    const decodedJwt: DecodedJwtType = jwtDecode(accessToken);
    const userData = { id: decodedJwt.sub, username: decodedJwt.username };
    dispatch(setUser({ id: userData.id, username: userData.username }));
  }, [auth, dispatch]);

  useEffect(() => {
    authHandler();
  }, [authHandler]);

  if (isUninitialized || isLoading) {
    console.log(1);
    return "Loading...";
  }

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}
