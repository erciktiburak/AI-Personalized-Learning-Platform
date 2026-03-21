import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { rateLimitMiddleware } from '../middleware/rate-limit.middleware';
import { authMiddleware } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { registerSchema, loginSchema, refreshTokenSchema } from '../schemas/auth.schema';

const router = Router();

router.post('/register', rateLimitMiddleware, validate(registerSchema), AuthController.register);
router.post('/login', rateLimitMiddleware, validate(loginSchema), AuthController.login);
router.post('/refresh', validate(refreshTokenSchema), AuthController.refresh);
router.post('/logout', authMiddleware, AuthController.logout);

export default router;
