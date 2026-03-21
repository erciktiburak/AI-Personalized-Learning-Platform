import { Worker, Job } from 'bullmq';
import { redisConnection } from '../config/redis';
import { generateAdaptiveQuiz } from '../services/ai/quiz.ai';
import prisma from '../prisma/client';

export const quizWorker = new Worker(
  'quiz-generation',
  async (job: Job) => {
    const { moduleId, userId, userPerformance } = job.data;

    try {
      const module = await prisma.module.findUnique({ where: { id: moduleId } });
      if (!module) throw new Error('Module not found');

      const content = JSON.parse(module.content as string);
      const questions = await generateAdaptiveQuiz(
        module.title,
        content.keyConcepts,
        userPerformance || 50
      );

      const quiz = await prisma.quiz.create({
        data: {
          moduleId,
          title: `${module.title} Quizi`,
          type: 'ADAPTIVE',
          difficulty: userPerformance > 80 ? 3 : userPerformance > 50 ? 2 : 1,
          questions: {
            create: questions.map((q) => ({
              question: q.question,
              type: q.type as any,
              options: q.options,
              correctAnswer: q.correctAnswer,
              explanation: q.explanation,
              points: q.points,
            })),
          },
        },
      });

      console.log(`Quiz for module ${moduleId} generated successfully.`);
    } catch (error) {
      console.error(`Error generating quiz:`, error);
      throw error;
    }
  },
  { connection: redisConnection }
);
