import { ProblemType } from "../value-objects/ProblemType.js";

export class ProblemReport {
  constructor(
    public readonly id: number,
    public problemType: ProblemType,
    public description: string,
    public status: string,
    public url_attachments: string,
    public protocol: string,
    public readonly created_at: Date,
    public readonly updated_at: Date,
    public subscriber_id: number,
    public resolved_by_admin_id: number | null
  ) {}
}
