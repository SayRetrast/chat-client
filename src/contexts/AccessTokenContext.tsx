import { createContext, useState } from "react";

export type AccessTokenContextType = {
  accessToken?: string | null;
  setAccessToken: (accessToken: string | null) => void;
};

export const AccessTokenContext = createContext<AccessTokenContextType | null>(null);

const AccessTokenProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>();

  return <AccessTokenContext.Provider value={{ accessToken, setAccessToken }}>{children}</AccessTokenContext.Provider>;
};
export default AccessTokenProvider;
