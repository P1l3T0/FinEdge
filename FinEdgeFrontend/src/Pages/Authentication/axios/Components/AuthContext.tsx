import { ReactNode, createContext, useState } from "react"
import { Auth, AuthContextType } from "../../../../Utils/Types";

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<Auth>({});

  const contextValue: AuthContextType = {
    auth,
    setAuth
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;