import { AdministratorRepository } from "../../../domain/repositories/AdministratorRepository.js";

/**
 * @class DeleteAdministratorUseCase
 * @description Caso de uso responsável por remover um administrador do sistema.
 * @throws {EntityNotFoundException} - Se o administrador não for encontrado.
 * @throws {PersistenceException} - Se houver um erro na persistência.
 */
export class DeleteAdministratorUseCase {
  constructor(
    private administratorRepository: AdministratorRepository
  ) { }

  async execute(id: number): Promise<void> {
    await this.administratorRepository.delete(id);
  }
}
