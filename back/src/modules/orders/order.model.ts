import { Schema, model, Document, Types } from 'mongoose';
import { OrderItemSchema } from './order.item.model';

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface IOrderItem {
  productId: Types.ObjectId;
  shopId: Types.ObjectId;
  priceAtPurchase: string;
  quantity: number;
}

export interface IOrder extends Document {
  userId: Types.ObjectId;
  shopId: Types.ObjectId;
  groupOrderId?: Types.ObjectId | null;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentId?: Types.ObjectId | null;
  totalAmount: string;
  items: IOrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User', index: true },
  shopId: { type: Schema.Types.ObjectId, required: true, ref: 'Shop', index: true },
  groupOrderId: { type: Schema.Types.ObjectId, default: null },
  status: { type: String, enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
  paymentId: { type: Schema.Types.ObjectId, ref: 'Payment', default: null },
  totalAmount: { type: String, required: true },
  items: { type: [OrderItemSchema], required: true },
}, { timestamps: true });

export const OrderModel = model<IOrder>('Order', OrderSchema);
