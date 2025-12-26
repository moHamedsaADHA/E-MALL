import { Router } from 'express';
import { reviewController } from '../../modules/reviews/review.controller';
import { validateCreateReview } from '../../modules/reviews/review.validation';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware, validateCreateReview, reviewController.create.bind(reviewController));
router.get('/', reviewController.list.bind(reviewController));

export default router;
