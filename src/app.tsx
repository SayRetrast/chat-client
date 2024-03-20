import { useCallback, useContext, useEffect } from "react";
import Router from "./lib/router";
import { BrowserRouter } from "react-router-dom";
import { UserContext, UserContextType } from "./contexts/UserContext";
import { AccessTokenContext, AccessTokenContextType } from "./contexts/AccessTokenContext";
import { authAPI } from "./api/auth/auth.api";
import { DecodedJwtType } from "./types/decodedJwt.type";
import { jwtDecode } from "jwt-decode";

export default function App() {
  const { setUser } = useContext(UserContext) as UserContextType;
  const { setAccessToken } = useContext(AccessTokenContext) as AccessTokenContextType;

  const authHandler = useCallback(async () => {
    const { accessToken } = await authAPI();
    if (!accessToken) {
      throw new Error("Could not authorize.");
    }
    setAccessToken(accessToken);

    const decodedJwt: DecodedJwtType = jwtDecode(accessToken);
    const userData = { id: decodedJwt.sub, username: decodedJwt.username };
    setUser(userData);
  }, [setAccessToken, setUser]);

  useEffect(() => {
    authHandler();
  }, [authHandler]);

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}
