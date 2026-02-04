import mongoose from 'mongoose';
import { OrderModel } from './order.model';
import { ICreateOrderDTO, IOrderItemDTO } from './order.types';

export class OrderService {
  async createOrder(data: ICreateOrderDTO) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const total = data.items.reduce((sum, it) => sum + parseFloat(it.priceAtPurchase) * it.quantity, 0);
      const orderDoc = await OrderModel.create([{
        userId: data.userId,
        shopId: data.shopId,
        groupOrderId: data.groupOrderId ?? null,
        paymentId: data.paymentId ?? null,
        totalAmount: total.toFixed(2),
        status: 'pending',
        paymentStatus: 'pending',
        items: data.items.map((it: IOrderItemDTO) => ({
          productId: it.productId,
          shopId: it.shopId,
          priceAtPurchase: it.priceAtPurchase,
          quantity: it.quantity,
        })),
      }], { session });

      await session.commitTransaction();
      session.endSession();
      return OrderModel.findById(orderDoc[0]._id).lean().exec();
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
  }

  async createOrdersFromGroupedItems(userId: string, groupedItems: Record<string, IOrderItemDTO[]>, groupOrderId?: string) {
    const orders: any[] = [];
    for (const shopId of Object.keys(groupedItems)) {
      const items = groupedItems[shopId];
      const dto: ICreateOrderDTO = { userId, shopId, groupOrderId, items };
      const ord = await this.createOrder(dto);
      orders.push(ord);
    }
    return orders;
  }

  async findById(orderId: string) {
    return OrderModel.findById(orderId).lean().exec();
  }
}

export const orderService = new OrderService();
