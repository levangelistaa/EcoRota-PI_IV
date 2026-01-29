import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/authService';
import type { LoginRequest } from '../services/authService';

interface Administrator {
  id: string;
  email: string;
  name: string;
}

interface SubscriberData {
  id: number;
  email: string;
  neighborhoodId: number;
}

interface AuthContextData {
  administrator: Administrator | null;
  signed: boolean;
  loading: boolean;
  subscriberData: SubscriberData | null;
  isSubscriber: boolean;
  signIn(credentials: LoginRequest): Promise<void>;
  signOut(): void;
  updateAdministrator(data: Administrator): void;
  setSubscriberData(data: SubscriberData | null): void;
}


const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [administrator, setAdministrator] = useState<Administrator | null>(null);
  const [subscriberData, setSubscriberDataState] = useState<SubscriberData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storageAdministrator = localStorage.getItem('@EcoRota:administrator');
      const storageToken = localStorage.getItem('@EcoRota:token');

      if (storageAdministrator && storageToken) {
        setAdministrator(JSON.parse(storageAdministrator));
      }

      const storageSubscriber = localStorage.getItem('subscriberData');
      if (storageSubscriber) {
        setSubscriberDataState(JSON.parse(storageSubscriber));
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  async function signIn(credentials: LoginRequest) {
    const response = await authService.login(credentials);
    setAdministrator(response.administrator);
  }

  function signOut() {
    authService.logout();
    setAdministrator(null);
  }

  function updateAdministrator(data: Administrator) {
    localStorage.setItem('@EcoRota:administrator', JSON.stringify(data));
    setAdministrator(data);
  }

  function setSubscriberData(data: SubscriberData | null) {
    if (data) {
      localStorage.setItem('subscriberData', JSON.stringify(data));
      localStorage.setItem('hasSubscribed', 'true');
    } else {
      localStorage.removeItem('subscriberData');
      localStorage.removeItem('hasSubscribed');
    }
    setSubscriberDataState(data);
  }

  return (
    <AuthContext.Provider value={{ 
      signed: !!administrator, 
      administrator, 
      loading, 
      subscriberData,
      isSubscriber: !!subscriberData,
      signIn, 
      signOut, 
      updateAdministrator,
      setSubscriberData
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
