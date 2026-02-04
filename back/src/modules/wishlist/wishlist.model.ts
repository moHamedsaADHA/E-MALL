import { Schema, model, Document, Types } from 'mongoose';

export interface IWishlist extends Document {
  userId: Types.ObjectId;
  shopId?: Types.ObjectId;
  productIds: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const WishlistSchema = new Schema<IWishlist>({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User', index: true },
  shopId: { type: Schema.Types.ObjectId, ref: 'Shop', default: null },
  productIds: { type: [Schema.Types.ObjectId], ref: 'Product', default: [] },
}, { timestamps: true });

export const WishlistModel = model<IWishlist>('Wishlist', WishlistSchema);
