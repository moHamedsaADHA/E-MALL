import { Request, Response, NextFunction } from 'express';

export const validateCreateProduct = (req: Request, res: Response, next: NextFunction) => {
  // TODO: validate body (title, price, shopId)
  next();
};
