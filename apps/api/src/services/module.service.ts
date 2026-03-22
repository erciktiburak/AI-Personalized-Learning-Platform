import prisma from '../prisma/client';

export class ModuleService {
  static async getById(id: string) {
    return prisma.module.findUnique({
      where: { id },
      include: {
        learningPath: {
          include: { topic: true }
        }
      }
    });
  }
}
