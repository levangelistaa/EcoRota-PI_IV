import { Email } from "../value-objects/Email.js";

export class Subscriber {
    constructor(
        public readonly id: number,
        public email: Email,
        public address: string,
        public neighborhood_id: number,
        public readonly created_at: Date,
        public readonly updated_at: Date
    ) { }
}
