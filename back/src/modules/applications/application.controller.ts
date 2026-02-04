import { Request, Response, NextFunction } from 'express';
import { applicationService } from './application.service';

export class ApplicationController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.id;
      const doc = await applicationService.create(userId, req.body);
      res.status(201).json(doc);
    } catch (err) { next(err); }
  }
}

export const applicationController = new ApplicationController();
