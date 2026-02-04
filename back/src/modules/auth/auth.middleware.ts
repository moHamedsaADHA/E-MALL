import { Request, Response, NextFunction } from 'express';

// Placeholder for auth-specific middlewares (e.g., attachUser, refreshToken handling)

export const attachUser = (req: Request, res: Response, next: NextFunction) => {
  // TODO: decode JWT and attach user to req
  next();
};
