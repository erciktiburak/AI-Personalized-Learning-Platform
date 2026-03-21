import prisma from '../prisma/client';

export class TopicService {
  static async getAll() {
    return prisma.topic.findMany();
  }

  static async getBySlug(slug: string) {
    return prisma.topic.findUnique({ where: { slug } });
  }
}
