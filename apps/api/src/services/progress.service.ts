import prisma from '../prisma/client';

export class ProgressService {
  static async getStats(userId: string) {
    const completedModules = await prisma.progress.count({
      where: { userId, status: 'COMPLETED' },
    });

    const quizAttempts = await prisma.quizAttempt.findMany({
      where: { userId },
      select: { score: true },
    });

    const averageScore = quizAttempts.length > 0
      ? quizAttempts.reduce((acc, curr) => acc + curr.score, 0) / quizAttempts.length
      : 0;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { streak: true },
    });

    return {
      completedModules,
      averageScore: Math.round(averageScore),
      streak: user?.streak || 0,
    };
  }

  static async updateStreak(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return;

    const now = new Date();
    const lastActive = new Date(user.lastActiveAt);
    
    // Check if last active was yesterday
    const diffInMs = now.getTime() - lastActive.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 1) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          streak: { increment: 1 },
          lastActiveAt: now,
        },
      });
    } else if (diffInDays > 1) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          streak: 1,
          lastActiveAt: now,
        },
      });
    } else {
      await prisma.user.update({
        where: { id: userId },
        data: { lastActiveAt: now },
      });
    }
  }
}
