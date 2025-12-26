import { Request, Response, NextFunction } from 'express';

export const requireRole = (roles: string | string[]) => {
  const allowed = Array.isArray(roles) ? roles : [roles];
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || !user.roles) return res.status(403).json({ message: 'Forbidden' });
    const has = user.roles.some((r: string) => allowed.includes(r));
    if (!has) return res.status(403).json({ message: 'Forbidden' });
    next();
  };
};
