'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  setIsAdmin: (v: boolean) => void;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  setIsAdmin: () => {},
  checkAuth: async () => {},
  logout: async () => {},
});

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      setIsAdmin(data.isAdmin === true);
    } catch {
      setIsAdmin(false);
    }
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setIsAdmin(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin, checkAuth, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);
