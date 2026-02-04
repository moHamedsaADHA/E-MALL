import { Router } from 'express';
import { couponController } from '../../modules/coupons/coupon.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware, couponController.create.bind(couponController));

export default router;
