/**
 * @abstract PersistenceError
 * @description Classe base abstrata para todos os erros relacionados à camada de persistência.
 * Garante que falhas de infraestrutura não vazem detalhes técnicos para o domínio.
 */
export abstract class PersistenceError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
