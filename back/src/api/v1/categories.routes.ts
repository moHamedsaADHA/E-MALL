import { Router } from 'express';
import { createCategory, listCategories } from '../../modules/categories/category.controller';
import { validateCreateCategory } from '../../modules/categories/category.validation';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/', listCategories);
router.post('/', authMiddleware, validateCreateCategory, createCategory);

export default router;
