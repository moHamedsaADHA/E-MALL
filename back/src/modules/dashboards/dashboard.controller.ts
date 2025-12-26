import { Request, Response, NextFunction } from 'express';
import { dashboardService } from './dashboard.service';

export class DashboardController {
  async summary(req: Request, res: Response, next: NextFunction) {
    try {
      const shopId = req.params.shopId || undefined;
      const data = shopId ? await dashboardService.shopSummary(shopId) : await dashboardService.adminSummary();
      res.json(data);
    } catch (err) { next(err); }
  }
}

export const dashboardController = new DashboardController();
