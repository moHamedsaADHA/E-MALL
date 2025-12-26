import { Router } from 'express';
import { paymentController } from '../../modules/payments/payment.controller';
import { validateWebhook } from '../../modules/payments/payment.validation';

const router = Router();

router.post('/payments/:provider', validateWebhook, paymentController.handleWebhook.bind(paymentController));

export default router;
