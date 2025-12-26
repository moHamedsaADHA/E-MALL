import { Request, Response, NextFunction } from 'express';
import { notificationService } from './notification.service';

export class NotificationController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.id;
      const items = await notificationService.list(userId);
      res.json(items);
    } catch (err) { next(err); }
  }
}

export const notificationController = new NotificationController();
