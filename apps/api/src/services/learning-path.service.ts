import prisma from '../prisma/client';
import { CacheService } from './cache.service';

export class LearningPathService {
  static async getByUserId(userId: string) {
    const cacheKey = `user:${userId}:learning-paths`;
    const cached = await CacheService.get<any[]>(cacheKey);
    if (cached) return cached;

    const paths = await prisma.learningPath.findMany({
      where: { userId },
      include: {
        topic: true,
        modules: {
          orderBy: { order: 'asc' },
        },
      },
    });
    
    await CacheService.set(cacheKey, paths, 600); // Cache for 10 minutes
    return paths;
  }

  static async getById(id: string) {
    const cacheKey = `learning-path:${id}`;
    const cached = await CacheService.get<any>(cacheKey);
    if (cached) return cached;

    const path = await prisma.learningPath.findUnique({
      where: { id },
      include: {
        topic: true,
        modules: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (path) await CacheService.set(cacheKey, path, 600);
    return path;
  }

  static async invalidateUserCache(userId: string) {
    await CacheService.del(`user:${userId}:learning-paths`);
  }
}
