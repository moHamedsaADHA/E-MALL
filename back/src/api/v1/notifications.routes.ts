import { Router } from 'express';
import { notificationController } from '../../modules/notifications/notification.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/me', authMiddleware, notificationController.list.bind(notificationController));

export default router;
