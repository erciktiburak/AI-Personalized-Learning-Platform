import prisma from '../prisma/client';
import { quizQueue } from '../queues/quiz.queue';
import { AchievementService } from './achievement.service';
import { getPersonalizedRecommendations } from './ai/recommendation.ai';

export class QuizService {
  static async getByModuleId(moduleId: string, userId: string) {
    let quiz = await prisma.quiz.findFirst({
      where: { moduleId },
      include: { questions: true },
    });

    if (!quiz) {
      await quizQueue.add('generate-quiz', { moduleId, userId, userPerformance: 50 });
      return { status: 'GENERATING' };
    }

    return quiz;
  }

  static async submitQuiz(quizId: string, userId: string, answers: any[], timeTaken: number) {
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: true, module: true },
    });

    if (!quiz) throw new Error('Quiz not found');

    let totalPoints = 0;
    let earnedPoints = 0;
    const weakConcepts: string[] = [];

    quiz.questions.forEach((q, index) => {
      totalPoints += q.points;
      if (answers[index] === q.correctAnswer) {
        earnedPoints += q.points;
      } else {
        weakConcepts.push(q.question);
      }
    });

    const score = (earnedPoints / totalPoints) * 100;

    // Generate AI recommendations if score < 80
    let recommendations = null;
    if (score < 80) {
      try {
        recommendations = await getPersonalizedRecommendations(quiz.module.title, weakConcepts.slice(0, 3));
      } catch (e) {
        console.error('Failed to get recommendations', e);
      }
    }

    const attempt = await prisma.quizAttempt.create({
      data: {
        userId,
        quizId,
        score,
        answers: JSON.stringify(answers),
        recommendations: recommendations ? JSON.stringify(recommendations) : null,
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

      // Award XP points
      await prisma.user.update({
        where: { id: userId },
        data: { totalPoints: { increment: 50 } },
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

    // Check for achievements
    await AchievementService.checkAndUnlock(userId);

    return { attempt, score, recommendations };
  }
}
