import { Request, Response } from "express";
import { z } from "zod";
import { CreateAdministratorUseCase } from "../../application/use-cases/administrator/CreateAdministratorUseCase.js";
import { AuthenticateAdministratorUseCase } from "../../application/use-cases/administrator/AuthenticateAdministratorUseCase.js";
import { ListAdministratorsUseCase } from "../../application/use-cases/administrator/ListAdministratorsUseCase.js";
import { UpdateAdministratorUseCase } from "../../application/use-cases/administrator/UpdateAdministratorUseCase.js";
import { DeleteAdministratorUseCase } from "../../application/use-cases/administrator/DeleteAdministratorUseCase.js";

const createAdministratorSchema = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(6),
});

const authenticateAdministratorSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

const updateAdministratorSchema = z.object({
    name: z.string().min(3).max(255).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
});

export class AdministratorController {
    constructor(
        private createAdministratorUseCase: CreateAdministratorUseCase,
        private authenticateAdministratorUseCase: AuthenticateAdministratorUseCase,
        private listAdministratorsUseCase: ListAdministratorsUseCase,
        private updateAdministratorUseCase: UpdateAdministratorUseCase,
        private deleteAdministratorUseCase: DeleteAdministratorUseCase,
    ) { }

    async register(req: Request, res: Response) {
        const data = createAdministratorSchema.parse(req.body);

        const output = await this.createAdministratorUseCase.execute(data);

        return res.status(201).json(output);
    }

    async login(req: Request, res: Response) {
        const data = authenticateAdministratorSchema.parse(req.body);

        const output = await this.authenticateAdministratorUseCase.execute(data);

        return res.status(200).json(output);
    }

    async list(req: Request, res: Response) {
        const output = await this.listAdministratorsUseCase.execute();

        return res.status(200).json(output);
    }

    async update(req: Request, res: Response) {
        const id = Number(req.params.id);
        const data = updateAdministratorSchema.parse(req.body);

        const output = await this.updateAdministratorUseCase.execute(id, data);

        return res.status(200).json(output);
    }

    async delete(req: Request, res: Response) {
        const id = Number(req.params.id);
        
        await this.deleteAdministratorUseCase.execute(id);

        return res.status(204).send();
    }
}

