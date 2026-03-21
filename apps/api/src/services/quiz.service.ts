import prisma from '../prisma/client';
import { quizQueue } from '../queues/quiz.queue';

export class QuizService {
  static async getByModuleId(moduleId: string, userId: string) {
    let quiz = await prisma.quiz.findFirst({
      where: { moduleId },
      include: { questions: true },
    });

    if (!quiz) {
      // Logic to trigger quiz generation if not exists
      // For now, assume it might be generated on the fly or pre-generated
      // Let's trigger it if not found and return a pending status
      await quizQueue.add('generate-quiz', { moduleId, userId, userPerformance: 50 });
      return { status: 'GENERATING' };
    }

    return quiz;
  }

  static async submitQuiz(quizId: string, userId: string, answers: any[], timeTaken: number) {
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: true },
    });

    if (!quiz) throw new Error('Quiz not found');

    let totalPoints = 0;
    let earnedPoints = 0;

    quiz.questions.forEach((q, index) => {
      totalPoints += q.points;
      if (answers[index] === q.correctAnswer) {
        earnedPoints += q.points;
      }
    });

    const score = (earnedPoints / totalPoints) * 100;

    const attempt = await prisma.quizAttempt.create({
      data: {
        userId,
        quizId,
        score,
        answers: JSON.stringify(answers),
        timeTaken,
      },
    });

    // Update progress if score is good
    if (score >= 80) {
      await prisma.progress.upsert({
        where: { userId_moduleId: { userId, moduleId: quiz.moduleId } },
        update: { status: 'COMPLETED', percentage: 100 },
        create: { userId, moduleId: quiz.moduleId, status: 'COMPLETED', percentage: 100 },
      });

      // Unlock next module
      const currentModule = await prisma.module.findUnique({ where: { id: quiz.moduleId } });
      if (currentModule) {
        await prisma.module.updateMany({
          where: {
            learningPathId: currentModule.learningPathId,
            order: currentModule.order + 1,
          },
          data: { status: 'AVAILABLE' },
        });
      }
    }

    return { attempt, score };
  }
}
