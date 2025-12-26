import { Schema, model, Document, Types } from 'mongoose';

export type PaymentProvider = 'stripe' | 'paypal' | 'other';
export type PaymentStatus = 'pending' | 'succeeded' | 'failed' | 'refunded';

export interface IPayment extends Document {
  orderId: Types.ObjectId;
  shopId: Types.ObjectId;
  userId: Types.ObjectId;
  provider: PaymentProvider;
  providerPaymentId: string;
  amount: string;
  currency: string;
  status: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>({
  orderId: { type: Schema.Types.ObjectId, required: true, ref: 'Order', unique: true, index: true },
  shopId: { type: Schema.Types.ObjectId, required: true, ref: 'Shop', index: true },
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  provider: { type: String, required: true },
  providerPaymentId: { type: String, required: true, unique: true, index: true },
  amount: { type: String, required: true },
  currency: { type: String, required: true },
  status: { type: String, enum: ['pending', 'succeeded', 'failed', 'refunded'], default: 'pending' },
}, { timestamps: true });

export const PaymentModel = model<IPayment>('Payment', PaymentSchema);
