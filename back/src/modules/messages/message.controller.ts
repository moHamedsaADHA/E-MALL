import { Request, Response, NextFunction } from 'express';
import { messageService } from './message.service';

export class MessageController {
  async send(req: Request, res: Response, next: NextFunction) {
    try {
      const fromUserId = (req as any).user?.id;
      const { toUserId, content, shopId } = req.body;
      const msg = await messageService.send(fromUserId, toUserId, content, shopId);
      res.status(201).json(msg);
    } catch (err) { next(err); }
  }
}

export const messageController = new MessageController();
