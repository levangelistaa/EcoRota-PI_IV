import { SubscriberRepository } from "../../../domain/repositories/SubscriberRepository.js";
import { Email } from "../../../domain/value-objects/Email.js";
import { FindSubscriberByEmailOutputDTO } from "../../dtos/subscriber/FindSubscriberDTO.js";
import { EntityNotFoundError } from "../../../domain/errors/persistence/EntityNotFoundError.js";

/**
 * @class FindSubscriberByEmailUseCase
 * @description Caso de uso para buscar um assinante pelo seu endereço de e-mail.
 */
export class FindSubscriberByEmailUseCase {
    constructor(private subscriberRepository: SubscriberRepository) { }

    /**
     * @param emailStr Endereço de e-mail do assinante.
     * @throws {InvalidEmailError} Se o e-mail fornecido for inválido.
     * @throws {EntityNotFoundError} Se o assinante não for encontrado.
     * @throws {PersistenceError} Se houver um erro na persistência.
     */
    async execute(emailStr: string): Promise<FindSubscriberByEmailOutputDTO> {
        const email = new Email(emailStr);
        const subscriber = await this.subscriberRepository.findByEmail(email);

        if (!subscriber) {
            throw new EntityNotFoundError('Assinante', emailStr);
        }

        return {
            id: subscriber.id,
            email: subscriber.email.getValue(),
            street: subscriber.address.getStreet(),
            number: subscriber.address.getNumber(),
            complement: subscriber.address.getComplement(),
            postalCode: subscriber.address.getPostalCode()?.getValue(),
            postalCodeFormatted: subscriber.address.getPostalCode()?.getFormatted(),
            latitude: subscriber.address.getGeoLocation()?.getLatitude(),
            longitude: subscriber.address.getGeoLocation()?.getLongitude(),
            neighborhoodId: subscriber.neighborhoodId,
            createdAt: subscriber.createdAt,
            updatedAt: subscriber.updatedAt
        };
    }
}
