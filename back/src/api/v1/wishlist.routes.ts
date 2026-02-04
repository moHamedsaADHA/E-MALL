import { Router } from 'express';
import { wishlistController } from '../../modules/wishlist/wishlist.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/me', authMiddleware, wishlistController.add.bind(wishlistController));

export default router;
