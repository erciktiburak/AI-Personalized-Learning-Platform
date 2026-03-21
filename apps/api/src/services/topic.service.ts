import prisma from '../prisma/client';
import { CacheService } from './cache.service';

export class TopicService {
  static async getAll() {
    const cacheKey = 'topics:all';
    const cached = await CacheService.get<any[]>(cacheKey);
    if (cached) return cached;

    const topics = await prisma.topic.findMany();
    await CacheService.set(cacheKey, topics, 3600); // Cache for 1 hour
    return topics;
  }

  static async getBySlug(slug: string) {
    const cacheKey = `topics:${slug}`;
    const cached = await CacheService.get<any>(cacheKey);
    if (cached) return cached;

    const topic = await prisma.topic.findUnique({ where: { slug } });
    if (topic) await CacheService.set(cacheKey, topic, 3600);
    return topic;
  }
}
