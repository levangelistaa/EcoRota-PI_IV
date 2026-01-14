import { Email } from "../value-objects/Email.js";

export class Administrator {
    constructor(
      public readonly id: number,
      public name: string,
      public email: Email,
      public password?: string,
      public readonly creation_date?: Date,
      public readonly update_date?: Date
    ) {}
}
