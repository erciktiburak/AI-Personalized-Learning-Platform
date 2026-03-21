import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url().optional().default('redis://localhost:6379'),
  JWT_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  ANTHROPIC_API_KEY: z.string().startsWith('sk-ant-'),
  RESEND_API_KEY: z.string().startsWith('re_').optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('4000'),
});

export const env = envSchema.parse(process.env);
