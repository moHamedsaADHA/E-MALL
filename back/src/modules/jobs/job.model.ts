import { Schema, model, Document, Types } from 'mongoose';

export interface IJob extends Document {
  title: string;
  description?: string;
  shopId?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema = new Schema<IJob>({
  title: { type: String, required: true },
  description: { type: String },
  shopId: { type: Schema.Types.ObjectId, ref: 'Shop', default: null },
}, { timestamps: true });

export const JobModel = model<IJob>('Job', JobSchema);
