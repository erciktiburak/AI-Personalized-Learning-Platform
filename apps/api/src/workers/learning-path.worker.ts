import { Worker, Job } from 'bullmq';
import { redisConnection } from '../config/redis';
import { generateLearningPath } from '../services/ai/learning-path.ai';
import prisma from '../prisma/client';
import { LearningPathService } from '../services/learning-path.service';

export const learningPathWorker = new Worker(
  'learning-path-generation',
  async (job: Job) => {
    const { userId, topicId, level, score, assessmentId } = job.data;

    try {
      const topic = await prisma.topic.findUnique({ where: { id: topicId } });
      if (!topic) throw new Error('Topic not found');

      const pathData = await generateLearningPath(topic.name, level, score);

      await prisma.learningPath.create({
        data: {
          userId,
          topicId,
          title: pathData.title,
          description: pathData.description,
          status: 'READY',
          totalModules: pathData.modules.length,
          modules: {
            create: pathData.modules.map((m) => ({
              title: m.title,
              description: m.description,
              order: m.order,
              estimatedHours: m.estimatedHours,
              content: JSON.stringify({
                keyConcepts: m.keyConcepts,
                projectIdea: m.projectIdea,
              }),
              status: m.order === 1 ? 'AVAILABLE' : 'LOCKED',
            })),
          },
        },
      });

      // Invalidate cache
      await LearningPathService.invalidateUserCache(userId);

      console.log(`Learning path for user ${userId} generated successfully.`);
    } catch (error) {
      console.error(`Error generating learning path:`, error);
      throw error;
    }
  },
  { connection: redisConnection }
);
