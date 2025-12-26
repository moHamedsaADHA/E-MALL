import { Schema, model, Document, Types } from 'mongoose';

export type ReviewTarget = 'product' | 'shop';

export interface IReview extends Document {
  userId: Types.ObjectId;
  targetId: Types.ObjectId; // product._id or shop._id
  targetType: ReviewTarget;
  rating: number;
  title?: string;
  body?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User', index: true },
  targetId: { type: Schema.Types.ObjectId, required: true, index: true },
  targetType: { type: String, enum: ['product', 'shop'], required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: { type: String },
  body: { type: String },
}, { timestamps: true });

export const ReviewModel = model<IReview>('Review', ReviewSchema);
