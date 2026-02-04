import { Router } from 'express';
import { messageController } from '../../modules/messages/message.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware, messageController.send.bind(messageController));

export default router;
