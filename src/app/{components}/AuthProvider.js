"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, createContext, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "@/firebase-config";
import { PATHS } from "@/constants";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);

  const router = useRouter();
  const path = usePathname();
  console.log("user", user);

  useEffect(() => {
    if (path !== PATHS.login && path !== PATHS.register) {
      if (loading) {
        return;
      }
      if (!user) {
        router.push(PATHS.login);
        auth.signOut();
      }
    }
  }, [user, router, path, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
