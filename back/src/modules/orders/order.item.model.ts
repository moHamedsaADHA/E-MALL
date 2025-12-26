import { Schema } from 'mongoose';

export const OrderItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
  shopId: { type: Schema.Types.ObjectId, required: true, ref: 'Shop' },
  priceAtPurchase: { type: String, required: true },
  quantity: { type: Number, required: true },
});

// Note: Order items are stored as embedded subdocuments inside Order documents.
