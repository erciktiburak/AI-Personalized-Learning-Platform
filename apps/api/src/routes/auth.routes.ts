import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { rateLimitMiddleware } from '../middleware/rate-limit.middleware';

const router = Router();

router.post('/register', rateLimitMiddleware, AuthController.register);
router.post('/login', rateLimitMiddleware, AuthController.login);

export default router;
