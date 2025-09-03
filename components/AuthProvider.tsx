// components/AuthProvider.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from '@/types/user';

type AuthContextType = {
  user: User | null;
  login: (id: string) => Promise<User | null>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('musiclab_user');
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  async function login(id: string) {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) return null;
      const u: User = await res.json();
      setUser(u);
      localStorage.setItem('musiclab_user', JSON.stringify(u));
      return u;
    } catch (e) {
      return null;
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('musiclab_user');
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}
