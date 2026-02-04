import { Request, Response, NextFunction } from 'express';

export const validateCreateShop = (req: Request, res: Response, next: NextFunction) => {
  // TODO: validate body
  next();
};
