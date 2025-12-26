import { WishlistModel } from './wishlist.model';
import { Types } from 'mongoose';

class WishlistService {
  async add(userId: string, productId: string, shopId?: string) {
    const userObj = Types.ObjectId(userId);
    const doc = await WishlistModel.findOneAndUpdate(
      { userId: userObj, shopId: shopId ? Types.ObjectId(shopId) : null },
      { $addToSet: { productIds: Types.ObjectId(productId) } },
      { upsert: true, new: true },
    ).exec();
    return doc;
  }
}

export const wishlistService = new WishlistService();
