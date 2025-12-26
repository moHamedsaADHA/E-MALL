import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  description?: string;
  price: number;
  shopId: string; // Multi-tenant discriminator
  categoryId?: string | null;
  stock?: number;
  metadata?: any;
}

const productSchema = new Schema<IProduct>({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  shopId: { type: String, required: true, index: true },
  categoryId: { type: String, default: null },
  stock: { type: Number, default: 0 },
  metadata: { type: Schema.Types.Mixed },
}, { timestamps: true });

export const ProductModel = model<IProduct>('Product', productSchema);
