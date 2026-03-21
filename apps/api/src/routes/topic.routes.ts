import { Router } from 'express';
import { TopicController } from '../controllers/topic.controller';

const router = Router();

router.get('/', TopicController.getAll);
router.get('/:slug', TopicController.getBySlug);

export default router;
