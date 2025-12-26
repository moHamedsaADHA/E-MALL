import { Router } from 'express';
import { createShop, getShop } from '../../modules/shops/shop.controller';
import { validateCreateShop } from '../../modules/shops/shop.validation';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { requireRole } from '../../middlewares/roles.middleware';

const router = Router();

// Only shop owners or admins can create shops
router.post('/', authMiddleware, requireRole(['admin', 'super_admin']), validateCreateShop, createShop);
router.get('/:id', getShop);

export default router;
