import { Neighborhood } from "../entities/Neighborhood.js";

export interface NeighborhoodRepository {
    create(data: Omit<Neighborhood, "id" | "created_at" | "updated_at">): Promise<Neighborhood>;
    findById(id: number): Promise<Neighborhood | null>;
    findAll(): Promise<Neighborhood[]>;
    findByRouteId(routeId: number): Promise<Neighborhood[]>;
    update(id: number, data: Partial<Omit<Neighborhood, "id" | "created_at">>): Promise<Neighborhood>;
    delete(id: number): Promise<void>;
}
