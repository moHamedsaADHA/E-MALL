import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateAddItem = [
  body('productId').isString().notEmpty(),
  body('shopId').isString().notEmpty(),
  body('quantity').isInt({ min: 1 }).optional(),
  body('price').isNumeric().notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];
