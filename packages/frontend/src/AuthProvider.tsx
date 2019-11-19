import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthTokenLocalStorage } from "./utils/authTokenLocalStorage";

interface AuthContextValue {
  saveAuthToken: (authToken: string) => void;
  removeAuthToken: () => void;
  isAuthenticated: () => boolean;
  authToken: string | null;
}

const AuthContext = createContext<AuthContextValue>({
  saveAuthToken: () => {},
  removeAuthToken: () => {},
  isAuthenticated: () => false,
  authToken: null,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(AuthTokenLocalStorage.getAuthToken());
  console.log("AuthToken", authToken);

  const saveAuthToken = (authToken: string) => {
    setAuthToken(authToken);
  };

  const removeAuthToken = () => {
    setAuthToken(null);
  };

  const isAuthenticated = (): boolean => {
    return authToken !== null;
  };

  useEffect(() => {
    if (authToken !== null) {
      AuthTokenLocalStorage.setAuthToken(authToken);
    } else {
      AuthTokenLocalStorage.removeAuthToken();
    }
  }, [authToken]);

  return (
    <AuthContext.Provider value={{ authToken, saveAuthToken, removeAuthToken, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
