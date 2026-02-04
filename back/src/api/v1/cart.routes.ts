import { Router } from 'express';
import { cartController } from '../../modules/cart/cart.controller';
import { validateAddItem } from '../../modules/cart/cart.validation';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/me', authMiddleware, cartController.getCart.bind(cartController));
router.post('/me/items', authMiddleware, validateAddItem, cartController.addItem.bind(cartController));
router.delete('/me/items/:cartItemId', authMiddleware, cartController.removeItem.bind(cartController));
router.delete('/me', authMiddleware, cartController.clearCart.bind(cartController));

export default router;
