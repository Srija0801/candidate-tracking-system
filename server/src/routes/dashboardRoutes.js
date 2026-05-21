import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { getDashboardStats } from '../controllers/dashboardController.js';

const router = Router();

router.use(authMiddleware);
router.get('/', getDashboardStats);

export default router