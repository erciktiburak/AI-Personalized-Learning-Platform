import { Worker, Job } from 'bullmq';
import { redisConnection } from '../config/redis';
import { generateAssessmentQuestions } from '../services/ai/assessment.ai';
import prisma from '../prisma/client';

export const assessmentWorker = new Worker(
  'assessment-generation',
  async (job: Job) => {
    const { userId, topicId, assessmentId } = job.data;

    try {
      const topic = await prisma.topic.findUnique({ where: { id: topicId } });
      if (!topic) throw new Error('Topic not found');

      const questions = await generateAssessmentQuestions(topic.name);

      await prisma.assessment.update({
        where: { id: assessmentId },
        data: {
          status: 'COMPLETED',
          questions: {
            create: questions.map((q) => ({
              question: q.question,
              options: q.options,
              correctAnswer: q.correctAnswer,
              explanation: q.explanation,
              difficulty: q.difficulty,
            })),
          },
        },
      });

      console.log(`Assessment ${assessmentId} generated successfully.`);
    } catch (error) {
      console.error(`Error generating assessment ${assessmentId}:`, error);
      await prisma.assessment.update({
        where: { id: assessmentId },
        data: { status: 'FAILED' },
      });
      throw error;
    }
  },
  { connection: redisConnection }
);
