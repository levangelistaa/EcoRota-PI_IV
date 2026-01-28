import api from './api';

// Tipos básicos para a autenticação (poderão ser expandidos conforme necessário)
export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    
    if (response.data.token) {
      localStorage.setItem('@EcoRota:token', response.data.token);
      localStorage.setItem('@EcoRota:user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  },

  async logout(): Promise<void> {
    localStorage.removeItem('@EcoRota:token');
    localStorage.removeItem('@EcoRota:user');
  }
};
