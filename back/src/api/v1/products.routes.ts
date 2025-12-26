import { Router } from 'express';
import { createProduct, listProducts } from '../../modules/products/product.controller';
import { validateCreateProduct } from '../../modules/products/product.validation';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/', listProducts);
router.post('/', authMiddleware, validateCreateProduct, createProduct);

export default router;
