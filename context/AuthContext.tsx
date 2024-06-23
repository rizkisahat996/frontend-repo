import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../apis/firebase";
import { onAuthStateChanged, User, signOut, getIdToken } from "firebase/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  getUserToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Setting up auth state listener");
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed:", user);
      setUser(user);
      setLoading(false);
    });
    return () => {
      console.log("Cleaning up auth state listener");
      unsubscribe();
    };
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const getUserToken = async (): Promise<string | null> => {
    if (user) {
      try {
        return await getIdToken(user);
      } catch (error) {
        console.error("Error getting user token:", error);
        return null;
      }
    }
    return null;
  };

  console.log("AuthProvider render, user:", user);

  return (
    <AuthContext.Provider value={{ user, loading, logout, getUserToken }}>
      {children}
    </AuthContext.Provider>
  );
};
