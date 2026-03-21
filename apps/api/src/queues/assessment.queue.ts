import { Queue } from 'bullmq';
import { redisConnection } from '../config/redis';

export const assessmentQueue = new Queue('assessment-generation', {
  connection: redisConnection,
});

export const addAssessmentJob = async (userId: string, topicId: string) => {
  return assessmentQueue.add('generate-questions', { userId, topicId });
};
