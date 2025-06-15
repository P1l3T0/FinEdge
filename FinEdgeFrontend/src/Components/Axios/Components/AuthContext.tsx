import { ReactNode, createContext, useState } from "react";

export type AuthContextType = {
  isUserLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(document.cookie.includes("RefreshToken"));

  const login = () => setIsUserLoggedIn(true);
  const logout = () => setIsUserLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isUserLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;