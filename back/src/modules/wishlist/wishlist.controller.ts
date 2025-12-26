import { Request, Response, NextFunction } from 'express';
import { wishlistService } from './wishlist.service';

export class WishlistController {
  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.id;
      const { productId, shopId } = req.body;
      const doc = await wishlistService.add(userId, productId, shopId);
      res.status(201).json(doc);
    } catch (err) { next(err); }
  }
}

export const wishlistController = new WishlistController();
