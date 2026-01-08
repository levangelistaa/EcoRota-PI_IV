import { PrismaClient } from "../../../../prisma/generated/client/client.js";
import { Subscriber } from "../../../domain/entities/Subscriber.js";
import { SubscriberRepository } from "../../../domain/repositories/SubscriberRepository.js";

export class PrismaSubscriberRepository implements SubscriberRepository {
    constructor(private prisma: PrismaClient) { }

    async create(data: Omit<Subscriber, "id" | "created_at" | "updated_at">): Promise<Subscriber> {
        const createdSubscriber = await this.prisma.subscriber.create({
            data: {
                email: data.email,
                address: data.address,
                neighborhood_id: data.neighborhood_id,
            },
        });

        return new Subscriber(
            createdSubscriber.id,
            createdSubscriber.email,
            createdSubscriber.address,
            createdSubscriber.neighborhood_id,
            createdSubscriber.created_at,
            createdSubscriber.updated_at
        );
    }

    async findById(id: number): Promise<Subscriber | null> {
        const subscriber = await this.prisma.subscriber.findUnique({
            where: { id },
        });

        if (!subscriber) return null;

        return new Subscriber(
            subscriber.id,
            subscriber.email,
            subscriber.address,
            subscriber.neighborhood_id,
            subscriber.created_at,
            subscriber.updated_at
        );
    }

    async findByEmail(email: string): Promise<Subscriber | null> {
        const subscriber = await this.prisma.subscriber.findUnique({
            where: { email },
        });

        if (!subscriber) return null;

        return new Subscriber(
            subscriber.id,
            subscriber.email,
            subscriber.address,
            subscriber.neighborhood_id,
            subscriber.created_at,
            subscriber.updated_at
        );
    }

    async findAll(): Promise<Subscriber[]> {
        const subscribers = await this.prisma.subscriber.findMany();

        return subscribers.map(
            (subscriber) =>
                new Subscriber(
                    subscriber.id,
                    subscriber.email,
                    subscriber.address,
                    subscriber.neighborhood_id,
                    subscriber.created_at,
                    subscriber.updated_at
                )
        );
    }

    async findByNeighborhoodId(neighborhoodId: number): Promise<Subscriber[]> {
        const subscribers = await this.prisma.subscriber.findMany({
            where: { neighborhood_id: neighborhoodId },
        });

        return subscribers.map(
            (subscriber) =>
                new Subscriber(
                    subscriber.id,
                    subscriber.email,
                    subscriber.address,
                    subscriber.neighborhood_id,
                    subscriber.created_at,
                    subscriber.updated_at
                )
        );
    }

    async update(id: number, data: Partial<Omit<Subscriber, "id" | "created_at">>): Promise<Subscriber> {
        const updatedSubscriber = await this.prisma.subscriber.update({
            where: { id },
            data: {
                email: data.email,
                address: data.address,
                neighborhood_id: data.neighborhood_id,
            },
        });

        return new Subscriber(
            updatedSubscriber.id,
            updatedSubscriber.email,
            updatedSubscriber.address,
            updatedSubscriber.neighborhood_id,
            updatedSubscriber.created_at,
            updatedSubscriber.updated_at
        );
    }

    async delete(id: number): Promise<void> {
        await this.prisma.subscriber.delete({
            where: { id },
        });
    }
}
