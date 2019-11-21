import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthTokenLocalStorage } from "./utils/authTokenLocalStorage";

interface AuthContextValue {
  saveAuthToken: (authToken: string) => void;
  removeAuthToken: () => void;
  isAuthenticated: () => boolean;
  authToken: string | null;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  saveAuthToken: () => {},
  removeAuthToken: () => {},
  isAuthenticated: () => false,
  authToken: null,
  logOut: () => {},
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

  const logOut = () => {
    removeAuthToken();
  };

  useEffect(() => {
    if (authToken !== null) {
      AuthTokenLocalStorage.setAuthToken(authToken);
    } else {
      AuthTokenLocalStorage.removeAuthToken();
    }
  }, [authToken]);

  return (
    <AuthContext.Provider value={{ authToken, saveAuthToken, removeAuthToken, isAuthenticated, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
