import prisma from '../prisma/client';

export class SocialService {
  static async getPublicProfile(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        image: true,
        streak: true,
        totalPoints: true,
        achievements: {
          include: { badge: true },
        },
        learningPaths: {
          where: { status: 'COMPLETED' },
          include: { topic: true },
        },
      },
    });
  }

  static async getFeed() {
    // Get latest 20 achievements globally
    return prisma.userBadge.findMany({
      take: 20,
      orderBy: { unlockedAt: 'desc' },
      include: {
        user: { select: { name: true, image: true } },
        badge: true,
      },
    });
  }
}
