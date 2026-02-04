import { Schema, model, Document, Types } from 'mongoose';

export interface ICartItem {
  _id: Types.ObjectId;
  productId: Types.ObjectId;
  shopId: Types.ObjectId;
  quantity: number;
  price: string; // store as string for precision
  createdAt?: Date;
}

export interface ICart extends Document {
  userId: Types.ObjectId;
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

const CartItemSchema = new Schema<ICartItem>({
  productId: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
  shopId: { type: Schema.Types.ObjectId, required: true, ref: 'Shop', index: true },
  quantity: { type: Number, required: true, default: 1 },
  price: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const CartSchema = new Schema<ICart>({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User', index: true },
  items: { type: [CartItemSchema], default: [] },
}, { timestamps: true });

export const CartModel = model<ICart>('Cart', CartSchema);

export const CartItemSchemaExport = CartItemSchema;
