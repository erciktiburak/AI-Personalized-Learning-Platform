import { Router } from 'express';
import { SocialController } from '../controllers/social.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/profile/:id', SocialController.getProfile);
router.get('/feed', SocialController.getFeed);

export default router;
