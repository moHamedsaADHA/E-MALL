import { Schema, model, Document, Types } from 'mongoose';

export interface IApplication extends Document {
  applicantId: Types.ObjectId;
  shopId?: Types.ObjectId;
  data: any;
  status: string;
  createdAt: Date;
}

const ApplicationSchema = new Schema<IApplication>({
  applicantId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  shopId: { type: Schema.Types.ObjectId, ref: 'Shop', default: null },
  data: { type: Schema.Types.Mixed },
  status: { type: String, default: 'pending' },
}, { timestamps: true });

export const ApplicationModel = model<IApplication>('Application', ApplicationSchema);
