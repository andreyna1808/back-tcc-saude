import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextProps {
  token: string | null;
  expiresAt: number | null;
  typeUser: string | null;
  login: (newToken: string, expiresAt: number, typeUser: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [typeUser, setTypeUser] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("authToken");
      const storedExpiresAt = localStorage.getItem("authExpiresAt");
      const storedTypeUser = localStorage.getItem("typeUser");

      if (storedToken) setToken(storedToken);
      if (storedExpiresAt) setExpiresAt(parseInt(storedExpiresAt));
      if (storedTypeUser) setTypeUser(storedTypeUser);
    }
  }, []);

  const login = (newToken: string, expiresAt: number, typeUser: string) => {
    setToken(newToken);
    setExpiresAt(expiresAt);
    setTypeUser(typeUser);
    if (typeof window !== "undefined") {
      localStorage.setItem("authToken", newToken);
      localStorage.setItem("typeUser", typeUser);
      localStorage.setItem("authExpiresAt", expiresAt.toString());
    }
  };

  const logout = () => {
    setToken(null);
    setExpiresAt(null);
    setTypeUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authExpiresAt");
      localStorage.removeItem("typeUser");
    }
  };

  useEffect(() => {
    if (expiresAt) {
      const timeout = expiresAt - Date.now();
      if (timeout > 0) {
        const timer = setTimeout(() => {
          logout();
        }, timeout);
        return () => clearTimeout(timer);
      } else {
        logout();
      }
    }
  }, [expiresAt]);

  return (
    <AuthContext.Provider value={{ token, expiresAt, typeUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
