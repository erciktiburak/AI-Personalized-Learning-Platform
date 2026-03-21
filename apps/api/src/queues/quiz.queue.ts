import { Queue } from 'bullmq';
import { redisConnection } from '../config/redis';

export const quizQueue = new Queue('quiz-generation', {
  connection: redisConnection,
});
