import { Request, Response, NextFunction } from 'express';
import { cartService } from './cart.service';

export class CartController {
  async getCart(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId || (req as any).user?.id;
      const cart = await cartService.getCartByUser(userId);
      res.json(cart);
    } catch (err) {
      next(err);
    }
  }

  async addItem(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.id || req.params.userId;
      const item = req.body;
      const cart = await cartService.addItem(userId, item);
      res.status(201).json(cart);
    } catch (err) {
      next(err);
    }
  }

  async removeItem(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.id || req.params.userId;
      const { cartItemId } = req.params;
      const ok = await cartService.removeItem(cartItemId, userId);
      if (!ok) return res.status(404).json({ message: 'Not found or not authorized' });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  async clearCart(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.id || req.params.userId;
      await cartService.clearCart(userId);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

export const cartController = new CartController();
