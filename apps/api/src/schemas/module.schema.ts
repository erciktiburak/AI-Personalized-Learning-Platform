import { z } from 'zod';

export const updateModuleSchema = z.object({
  body: z.object({
    title: z.string().min(2).optional(),
    description: z.string().min(10).optional(),
    content: z.record(z.any()).optional(),
  }),
});

export const createTopicSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    slug: z.string().min(2),
    description: z.string().min(10),
    category: z.string().min(2),
  }),
});
