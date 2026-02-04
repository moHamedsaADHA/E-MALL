import { Router } from 'express';
import { paymentController } from '../../modules/payments/payment.controller';
import { validateCreatePayment, validateWebhook } from '../../modules/payments/payment.validation';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware, validateCreatePayment, paymentController.createPayment.bind(paymentController));

// Webhook route kept in webhooks router; also allow direct provider webhook here
router.post('/webhook/:provider', validateWebhook, paymentController.handleWebhook.bind(paymentController));

export default router;
