import { Queue } from 'bullmq';
import { redisConnection } from '../config/redis';

export const learningPathQueue = new Queue('learning-path-generation', {
  connection: redisConnection,
});
