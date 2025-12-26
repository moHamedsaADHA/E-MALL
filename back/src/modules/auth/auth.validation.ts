import { Request, Response, NextFunction } from 'express';

// TODO: use a validation library (Joi/Zod) in the future

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  // placeholder
  next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  next();
};
