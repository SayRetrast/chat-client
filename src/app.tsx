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
    try {
      const { accessToken } = await auth().unwrap();
      dispatch(setAccessToken(accessToken));

      const decodedJwt: DecodedJwtType = jwtDecode(accessToken);
      const userData = { id: decodedJwt.sub, username: decodedJwt.username };
      dispatch(setUser({ id: userData.id, username: userData.username }));
    } catch (error) {
      console.log("Sign in to an account to start using this app.");
    }
  }, [auth, dispatch]);

  useEffect(() => {
    authHandler();
  }, [authHandler]);

  if (isUninitialized || isLoading) {
    return "Loading...";
  }

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}
