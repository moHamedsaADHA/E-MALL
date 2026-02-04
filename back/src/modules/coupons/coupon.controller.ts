import { Request, Response, NextFunction } from 'express';
import { couponService } from './coupon.service';

export class CouponController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await couponService.create(req.body);
      res.status(201).json(doc);
    } catch (err) { next(err); }
  }
}

export const couponController = new CouponController();
