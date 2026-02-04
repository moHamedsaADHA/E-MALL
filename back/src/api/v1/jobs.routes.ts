import { Router } from 'express';
import { jobController } from '../../modules/jobs/job.controller';

const router = Router();

router.get('/', jobController.list.bind(jobController));

export default router;
