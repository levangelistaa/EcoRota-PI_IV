import { AdministratorRepository } from "../../../domain/repositories/AdministratorRepository.js";
import { HashProvider } from "../../../domain/providers/HashProvider.js";
import { Email } from "../../../domain/value-objects/Email.js";
import { 
  UpdateAdministratorInputDTO, 
  UpdateAdministratorOutputDTO 
} from "../../dtos/administrator/UpdateAdministratorDTO.js";

/**
 * @class UpdateAdministratorUseCase
 * @description Caso de uso responsável por atualizar os dados de um administrador.
 * @throws {InvalidEmailError} - Se o email for inválido.
 * @throws {EntityNotFoundError} - Se o administrador não for encontrado.
 * @throws {HashingError} - Se houver um erro na geração do hash.
 * @throws {ConflictError} - Se houver um erro de conflito.
 * @throws {PersistenceError} - Se houver um erro na persistência.
 */
export class UpdateAdministratorUseCase {
  constructor(
    private administratorRepository: AdministratorRepository,
    private hashProvider: HashProvider
  ) { }

  async execute(id: number, input: UpdateAdministratorInputDTO): Promise<UpdateAdministratorOutputDTO> {
    const data: any = {};

    if (input.name) data.name = input.name;
    if (input.email) data.email = new Email(input.email);
    if (input.password) {
      data.password = await this.hashProvider.generateHash(input.password);
    }

    const administrator = await this.administratorRepository.update(id, data);

    return {
      id: administrator.id,
      name: administrator.name,
      email: administrator.email.getValue(),
      createdAt: administrator.createdAt,
      updatedAt: administrator.updatedAt
    };
  }
}
