import prisma from '../prisma/client';

export class LearningPathService {
  static async getByUserId(userId: string) {
    return prisma.learningPath.findMany({
      where: { userId },
      include: {
        topic: true,
        modules: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  static async getById(id: string) {
    return prisma.learningPath.findUnique({
      where: { id },
      include: {
        topic: true,
        modules: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }
}
