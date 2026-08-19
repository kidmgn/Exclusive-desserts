import { createContext, useCallback, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface AuthContextValue {
  isAdmin: boolean;
  loginAsAdmin: (password: string) => boolean;
  loginAsUser: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const ADMIN_PASSWORD = 'admin123'; // можно поменять при необходимости

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem('isAdmin') === 'true';
    } catch {
      return false;
    }
  });

  const loginAsAdmin = useCallback((password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      try {
        localStorage.setItem('isAdmin', 'true');
      } catch {
        // ignore
      }
      return true;
    }
    return false;
  }, []);

  const loginAsUser = useCallback(() => {
    setIsAdmin(false);
    try {
      localStorage.removeItem('isAdmin');
    } catch {
      // ignore
    }
  }, []);

  const logout = useCallback(() => {
    setIsAdmin(false);
    try {
      localStorage.removeItem('isAdmin');
    } catch {
      // ignore
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAdmin, loginAsAdmin, loginAsUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}