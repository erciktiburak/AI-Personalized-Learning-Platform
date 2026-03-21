import prisma from '../prisma/client';

export class AchievementService {
  static async checkAndUnlock(userId: string) {
    const stats = await this.getUserStats(userId);
    const allBadges = await prisma.badge.findMany();
    const userBadges = await prisma.userBadge.findMany({
      where: { userId },
      select: { badgeId: true },
    });

    const userBadgeIds = new Set(userBadges.map((ub) => ub.badgeId));

    for (const badge of allBadges) {
      if (userBadgeIds.has(badge.id)) continue;

      const criteria = badge.criteria as any;
      let unlocked = false;

      if (criteria.type === 'streak' && stats.streak >= criteria.value) unlocked = true;
      if (criteria.type === 'modules' && stats.completedModules >= criteria.value) unlocked = true;
      if (criteria.type === 'score' && stats.maxScore >= criteria.value) unlocked = true;

      if (unlocked) {
        await prisma.userBadge.create({
          data: { userId, badgeId: badge.id },
        });
      }
    }
  }

  private static async getUserStats(userId: string) {
    const completedModules = await prisma.progress.count({
      where: { userId, status: 'COMPLETED' },
    });

    const maxScoreAttempt = await prisma.quizAttempt.findFirst({
      where: { userId },
      orderBy: { score: 'desc' },
    });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { streak: true },
    });

    return {
      completedModules,
      maxScore: maxScoreAttempt?.score || 0,
      streak: user?.streak || 0,
    };
  }
}
