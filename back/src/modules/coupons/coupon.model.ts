import { Schema, model, Document, Types } from 'mongoose';

export interface ICoupon extends Document {
  code: string;
  shopId?: Types.ObjectId | null; // null means global
  discountPercent?: number;
  amountOff?: string; // string for precision
  validFrom?: Date;
  validTo?: Date;
  usageLimit?: number;
  createdAt: Date;
}

const CouponSchema = new Schema<ICoupon>({
  code: { type: String, required: true, unique: true, index: true },
  shopId: { type: Schema.Types.ObjectId, ref: 'Shop', default: null },
  discountPercent: { type: Number, default: null },
  amountOff: { type: String, default: null },
  validFrom: { type: Date, default: null },
  validTo: { type: Date, default: null },
  usageLimit: { type: Number, default: null },
}, { timestamps: true });

export const CouponModel = model<ICoupon>('Coupon', CouponSchema);
