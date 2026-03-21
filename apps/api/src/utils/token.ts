import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import redis from '../config/redis';

export const generateTokens = (userId: string) => {
  const accessToken = jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId }, env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

export const blacklistToken = async (token: string, expiresIn: number) => {
  await redis.set(`blacklist:${token}`, 'true', 'EX', expiresIn);
};

export const isTokenBlacklisted = async (token: string) => {
  const result = await redis.get(`blacklist:${token}`);
  return result === 'true';
};
