import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/authService';
import type { LoginRequest } from '../services/authService';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextData {
  user: User | null;
  signed: boolean;
  loading: boolean;
  signIn(credentials: LoginRequest): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = localStorage.getItem('@EcoRota:user');
      const storageToken = localStorage.getItem('@EcoRota:token');

      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  async function signIn(credentials: LoginRequest) {
    const response = await authService.login(credentials);
    setUser(response.user);
  }

  function signOut() {
    authService.logout();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
