import { Router } from 'express';
import { ModuleController } from '../controllers/module.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/:id', ModuleController.getById);

export default router;
