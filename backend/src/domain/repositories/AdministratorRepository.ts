import { Administrator } from "../entities/Administrator.js";

export interface AdministratorRepository {
  create(admin: Omit<Administrator, "id" | "creation_date" | "update_date">): Promise<Administrator>;
  findByEmail(email: string): Promise<Administrator | null>;
  findById(id: number): Promise<Administrator | null>;
}
