import { body, validationResult, header } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateCreatePayment = [
  body('orderId').isUUID(),
  body('shopId').isUUID(),
  body('userId').isUUID(),
  body('provider').isString().notEmpty(),
  body('providerPaymentId').isString().notEmpty(),
  body('amount').isNumeric(),
  body('currency').isString().isLength({ min: 3, max: 8 }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

export const validateWebhook = [
  header('stripe-signature').optional().isString(),
  header('x-signature').optional().isString(),
  (req: Request, res: Response, next: NextFunction) => {
    // presence of a signature header is enforced in service layer; allow DTO validation to proceed
    next();
  },
];
