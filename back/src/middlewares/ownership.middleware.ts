import { Request, Response, NextFunction } from 'express';

export const requireShopOwnership = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    const shopId = req.params.shopId || req.body.shopId;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    if (user.shopId && String(user.shopId) === String(shopId)) return next();
    return res.status(403).json({ message: 'Forbidden: not owner of shop' });
  };
};
