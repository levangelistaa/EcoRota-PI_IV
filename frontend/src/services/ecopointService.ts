import api from './api';

export interface Ecopoint {
    id: number;
    name: string;
    partnerName?: string;
    materials: string[];
    latitude: number;
    longitude: number;
    collectionDays: string[];
    startTime: string;
    endTime: string;
    neighborhoodId: number;
}

export const ecopointService = {
    async list(neighborhoodId?: number): Promise<Ecopoint[]> {
        const response = await api.get<Ecopoint[]>('/ecopoints', {
            params: { neighborhoodId }
        });
        return response.data;
    },

    async findById(id: number): Promise<Ecopoint> {
        const response = await api.get<Ecopoint>(`/ecopoints/${id}`);
        return response.data;
    },

    async create(data: Omit<Ecopoint, 'id'>): Promise<Ecopoint> {
        const response = await api.post<Ecopoint>('/ecopoints', data);
        return response.data;
    },

    async update(id: number, data: Partial<Ecopoint>): Promise<Ecopoint> {
        const response = await api.put<Ecopoint>(`/ecopoints/${id}`, data);
        return response.data;
    },

    async delete(id: number): Promise<void> {
        await api.delete(`/ecopoints/${id}`);
    }
};
