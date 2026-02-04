import { Request, Response, NextFunction } from 'express';
import { jobService } from './job.service';

export class JobController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const jobs = await jobService.list();
      res.json(jobs);
    } catch (err) { next(err); }
  }
}

export const jobController = new JobController();
