import api from './api';

export interface Admin {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateAdminData {
  name?: string;
  email?: string;
  password?: string;
}

export const adminService = {
  async list(): Promise<Admin[]> {
    const response = await api.get<Admin[]>('/administrators');
    return response.data;
  },

  async update(id: string, data: UpdateAdminData): Promise<Admin> {
    const response = await api.put<Admin>(`/administrators/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/administrators/${id}`);
  }
};
