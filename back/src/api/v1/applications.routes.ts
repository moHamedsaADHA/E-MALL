import { Router } from 'express';
import { applicationController } from '../../modules/applications/application.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware, applicationController.create.bind(applicationController));

export default router;
