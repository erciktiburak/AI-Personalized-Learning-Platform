import { Router } from 'express';
import { AssessmentController } from '../controllers/assessment.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/start', AssessmentController.start);
router.get('/status/:id', AssessmentController.getStatus);
router.get('/status/:id/stream', AssessmentController.statusStream);
router.post('/submit/:id', AssessmentController.submit);

export default router;
