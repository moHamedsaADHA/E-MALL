import { Request, Response, NextFunction } from 'express';

export const validateMiddleware = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // schema is expected to be an array of express-validator middlewares or a function
    return next();
  };
};
