import { Router } from 'express';
import { ProjectController } from '../controllers/project.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/submit', ProjectController.submit);
router.get('/submissions/:moduleId', ProjectController.getSubmissions);

export default router;
