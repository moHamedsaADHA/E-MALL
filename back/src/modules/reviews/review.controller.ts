import { Request, Response, NextFunction } from 'express';
import { reviewService } from './review.service';

export class ReviewController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.id;
      const payload = req.body;
      const review = await reviewService.create(userId, payload);
      res.status(201).json(review);
    } catch (err) {
      next(err);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { targetId, targetType } = req.query as any;
      const reviews = await reviewService.list(String(targetId), String(targetType));
      res.json(reviews);
    } catch (err) {
      next(err);
    }
  }
}

export const reviewController = new ReviewController();
