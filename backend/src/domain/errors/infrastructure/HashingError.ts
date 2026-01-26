import { InfrastructureError } from "./InfrastructureError.js";

/**
 * @class HashingError
 * @description Erro lançado quando ocorre uma falha no processo de geração ou comparação de hash.
 */
export class HashingError extends InfrastructureError {
    constructor(message: string = "Erro ao processar hash de dados.") {
        super(message);
    }
}
