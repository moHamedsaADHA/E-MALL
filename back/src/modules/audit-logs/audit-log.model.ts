import { Schema, model, Document, Types } from 'mongoose';

export interface IAuditLog extends Document {
  actorId?: Types.ObjectId;
  action: string;
  resourceType?: string;
  resourceId?: Types.ObjectId;
  metadata?: any;
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>({
  actorId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  action: { type: String, required: true },
  resourceType: { type: String },
  resourceId: { type: Schema.Types.ObjectId, default: null },
  metadata: { type: Schema.Types.Mixed },
}, { timestamps: { createdAt: true, updatedAt: false } });

export const AuditLogModel = model<IAuditLog>('AuditLog', AuditLogSchema);
