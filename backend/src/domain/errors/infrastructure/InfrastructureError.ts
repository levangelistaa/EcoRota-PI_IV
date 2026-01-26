/**
 * @class InfrastructureError
 * @description Classe base para todos os erros relacionados à camada de infraestrutura.
 * Garante que falhas técnicas sejam encapsuladas para evitar vazamento de detalhes.
 */
export class InfrastructureError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
