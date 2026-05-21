import { Router } from 'express';
import authRoutes from './authRoutes.js';
import candidateRoutes from './candidateRoutes.js';
import dashboardRoutes from './dashboardRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/candidates', candidateRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;