import { Request, Response, NextFunction } from 'express';
import { orderService } from './order.service';
import { IOrderItemDTO } from './order.types';

export class OrderController {
  async createFromGrouped(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.id || req.body.userId;
      const groupedItems: Record<string, IOrderItemDTO[]> = req.body.groupedItems;
      const groupOrderId: string | undefined = req.body.groupOrderId;

      if (!userId) return res.status(400).json({ message: 'userId missing' });
      if (!groupedItems || typeof groupedItems !== 'object') return res.status(400).json({ message: 'groupedItems missing' });

      const orders = await orderService.createOrdersFromGroupedItems(userId, groupedItems, groupOrderId);
      res.status(201).json(orders);
    } catch (err) {
      next(err);
    }
  }

  async getOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const order = await orderService.findById(id);
      if (!order) return res.status(404).json({ message: 'Order not found' });
      res.json(order);
    } catch (err) {
      next(err);
    }
  }
}

export const orderController = new OrderController();
