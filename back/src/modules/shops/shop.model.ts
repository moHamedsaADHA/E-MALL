import { Schema, model, Document } from 'mongoose';

export interface IShop extends Document {
  name: string;
  description?: string;
  ownerId: string;
  metadata?: any;
}

const shopSchema = new Schema<IShop>({
  name: { type: String, required: true },
  description: { type: String },
  ownerId: { type: String, required: true },
  metadata: { type: Schema.Types.Mixed },
}, { timestamps: true });

export const ShopModel = model<IShop>('Shop', shopSchema);
