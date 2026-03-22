import { Router } from 'express';
import { ModuleController } from '../controllers/module.controller';
import { authMiddleware, authorize } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { updateModuleSchema } from '../schemas/module.schema';

const router = Router();

router.use(authMiddleware);

router.get('/:id', ModuleController.getById);

// Mentor or Admin can update module content
router.patch(
  '/:id', 
  authorize('MENTOR', 'ADMIN'), 
  validate(updateModuleSchema), 
  ModuleController.update
);

export default router;
