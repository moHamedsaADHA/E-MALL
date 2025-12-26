import { Router } from 'express';
import { dashboardController } from '../../modules/dashboards/dashboard.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { requireRole } from '../../middlewares/roles.middleware';

const router = Router();

// Admin-level summary
router.get('/admin/summary', authMiddleware, requireRole(['admin', 'super_admin']), dashboardController.summary.bind(dashboardController));

// Shop-level summary (shop owner or admin)
router.get('/shop/:shopId/summary', authMiddleware, requireRole(['shop_owner', 'admin', 'super_admin']), dashboardController.summary.bind(dashboardController));

export default router;
