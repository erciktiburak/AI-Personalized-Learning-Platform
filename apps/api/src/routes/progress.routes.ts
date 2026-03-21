import { Router } from 'express';
import { ProgressController } from '../controllers/progress.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/stats', ProgressController.getStats);

export default router;
