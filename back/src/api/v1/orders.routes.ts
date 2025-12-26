import { Router } from 'express';
import { orderController } from '../../modules/orders/order.controller';
import { validateCreateFromGrouped } from '../../modules/orders/order.validation';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/from-grouped', authMiddleware, validateCreateFromGrouped, orderController.createFromGrouped.bind(orderController));
router.get('/:id', authMiddleware, orderController.getOrder.bind(orderController));

export default router;
