import { Request, Response, NextFunction } from 'express';
import { param } from 'express-validator';
import { validationResult } from 'express-validator';

export const validateShopIdParam = [
  param('shopId').isString().notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];
