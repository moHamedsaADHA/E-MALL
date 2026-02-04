import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateCreateReview = [
  body('targetId').isString().notEmpty(),
  body('targetType').isIn(['product', 'shop']),
  body('rating').isInt({ min: 1, max: 5 }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];
