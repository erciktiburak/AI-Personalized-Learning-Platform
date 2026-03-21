import redis from '../config/redis';

export class CacheService {
  static async get<T>(key: string): Promise<T | null> {
    const data = await redis.get(key);
    if (!data) return null;
    return JSON.parse(data);
  }

  static async set(key: string, value: any, ttl: number = 3600): Promise<void> {
    await redis.set(key, JSON.stringify(value), 'EX', ttl);
  }

  static async del(key: string): Promise<void> {
    await redis.del(key);
  }

  static async delByPattern(pattern: string): Promise<void> {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  }
}
