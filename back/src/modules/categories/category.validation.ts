import { Request, Response, NextFunction } from 'express';

export const validateCreateCategory = (req: Request, res: Response, next: NextFunction) => {
  // TODO: validate name and optional parentId
  next();
};
