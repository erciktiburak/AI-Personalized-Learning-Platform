import { Router } from 'express';
import { LeaderboardController } from '../controllers/leaderboard.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/global', LeaderboardController.getGlobal);

export default router;
