import prisma from '../prisma/client';
import { CacheService } from './cache.service';

export class TopicService {
  static async getAll() {
    const cacheKey = 'topics:all';
    const cached = await CacheService.get<any[]>(cacheKey);
    if (cached) return cached;

    const topics = await prisma.topic.findMany();
    await CacheService.set(cacheKey, topics, 3600);
    return topics;
  }

  static async search(query: string) {
    return prisma.topic.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { category: { contains: query, mode: 'insensitive' } },
        ],
      },
    });
  }

  static async getBySlug(slug: string) {
...
