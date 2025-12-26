import { Types } from 'mongoose';
import { CartModel } from './cart.model';
import { ICartItemDTO } from './cart.types';

export class CartService {
  async getCartByUser(userId: string) {
    const id = Types.ObjectId.isValid(userId) ? Types.ObjectId(userId) : userId;
    return CartModel.findOne({ userId: id }).lean().exec();
  }

  async addItem(userId: string, item: ICartItemDTO) {
    const userObj = Types.ObjectId(userId);
    const cart = await CartModel.findOneAndUpdate(
      { userId: userObj },
      { $push: { items: { productId: item.productId, shopId: item.shopId, quantity: item.quantity, price: item.price } } },
      { upsert: true, new: true },
    ).exec();
    return cart;
  }

  async removeItem(cartId: string, cartItemId: string, userId: string) {
    const cart = await CartModel.findOne({ _id: cartId, userId: userId }).exec();
    if (!cart) return null;
    await CartModel.updateOne({ _id: cartId }, { $pull: { items: { _id: cartItemId } } }).exec();
    return true;
  }

  async clearCart(userId: string) {
    const userObj = Types.ObjectId(userId);
    await CartModel.deleteOne({ userId: userObj }).exec();
    return true;
  }

  async groupItemsByShop(userId: string) {
    const cart = await this.getCartByUser(userId);
    if (!cart || !cart.items) return {} as Record<string, any[]>;
    const map: Record<string, any[]> = {};
    for (const it of cart.items) {
      const key = String(it.shopId);
      if (!map[key]) map[key] = [];
      map[key].push(it);
    }
    return map;
  }
}

export const cartService = new CartService();
