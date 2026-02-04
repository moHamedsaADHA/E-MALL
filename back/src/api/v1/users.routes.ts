import { Router } from 'express';
import { getProfile, updateProfile } from '../../modules/users/user.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/me', authMiddleware, getProfile);
router.put('/me', authMiddleware, updateProfile);

export default router;
