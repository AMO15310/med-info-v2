"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { isLogged } from "@/appwrite/auth.actions";

interface AuthContextType {
  isUserLoggedIn: boolean;
  checkLoggedIn: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isUserLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoggedIn = async () => {
    const logged: any = await isLogged();
    setIsLoggedIn(logged.status);
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ isUserLoggedIn, checkLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
