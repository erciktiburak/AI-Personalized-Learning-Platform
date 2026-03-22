import { Router } from 'express';
import { ChatController } from '../controllers/chat.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/history/:moduleId', ChatController.getHistory);
router.post('/send/:moduleId', ChatController.sendMessage);

export default router;
