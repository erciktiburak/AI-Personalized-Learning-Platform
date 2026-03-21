import { Router } from 'express';
import { QuizController } from '../controllers/quiz.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/module/:moduleId', QuizController.getByModule);
router.post('/:id/submit', QuizController.submit);

export default router;
