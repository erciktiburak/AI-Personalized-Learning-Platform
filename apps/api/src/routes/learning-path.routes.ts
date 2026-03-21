import { Router } from 'express';
import { LearningPathController } from '../controllers/learning-path.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/', LearningPathController.getAll);
router.get('/:id', LearningPathController.getById);

export default router;
