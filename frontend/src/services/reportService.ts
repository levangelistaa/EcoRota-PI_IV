import api from './api';

export interface ProblemReport {
    id: number;
    protocol: string;
    description: string;
    problemType: string;
    attachments: string[];
    status: 'PENDING' | 'IN_ANALYSIS' | 'RESOLVED' | 'REJECTED';
    subscriberId: number;
    createdAt: string;
    updatedAt: string;
    justification: string | null;
    resolvedByAdminId: number | null;
}

export interface CreateProblemReport {
    description: string;
    problemType: string;
    subscriberId: number;
    attachments?: string[];
}

export const reportService = {
    async create(data: CreateProblemReport): Promise<ProblemReport> {
        const response = await api.post<ProblemReport>('/problem-reports', data);
        return response.data;
    },

    async uploadImages(files: File[]): Promise<string[]> {
        const formData = new FormData();
        files.forEach(file => formData.append('files', file));
        const response = await api.post<{ urls: string[] }>('/uploads', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data.urls;
    },

    async list(): Promise<ProblemReport[]> {
        const response = await api.get<ProblemReport[]>('/problem-reports');
        return response.data;
    },

    async findById(id: number): Promise<ProblemReport> {
        const response = await api.get<ProblemReport>(`/problem-reports/${id}`);
        return response.data;
    },

    async updateStatus(id: number, status: ProblemReport['status'], justification?: string): Promise<ProblemReport> {
        const response = await api.patch<ProblemReport>(`/problem-reports/${id}/resolve`, { status, justification });
        return response.data;
    },

    async delete(id: number): Promise<void> {
        await api.delete(`/problem-reports/${id}`);
    }
};
