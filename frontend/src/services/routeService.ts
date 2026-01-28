import api from './api';

export interface Route {
    id: number;
    name: string;
    collectionType: string;
    collectionDays: string[];
    startTime: string;
    endTime: string;
}

export const routeService = {
    async list(): Promise<Route[]> {
        const response = await api.get<Route[]>('/routes');
        return response.data;
    },

    async findById(id: number): Promise<Route> {
        const response = await api.get<Route>(`/routes/${id}`);
        return response.data;
    },

    async create(data: Omit<Route, 'id'>): Promise<Route> {
        const response = await api.post<Route>('/routes', data);
        return response.data;
    },

    async update(id: number, data: Partial<Route>): Promise<Route> {
        const response = await api.put<Route>(`/routes/${id}`, data);
        return response.data;
    },

    async delete(id: number): Promise<void> {
        await api.delete(`/routes/${id}`);
    }
};
