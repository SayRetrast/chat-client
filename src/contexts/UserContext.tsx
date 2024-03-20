import { createContext, useState } from "react";

type UserType = {
  id?: string;
  username?: string;
};

export type UserContextType = {
  user?: UserType | null;
  setUser: (userData: UserType | null) => void;
};

export const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>();

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
export default UserProvider;
