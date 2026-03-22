import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import prisma from '../prisma/client';
import { reviewProjectCode } from '../services/ai/code-review.ai';
import logger from '../utils/logger';

export class ProjectController {
  static async submit(req: AuthRequest, res: Response) {
    try {
      const { moduleId, code } = req.body;
      const userId = req.userId!;

      const module = await prisma.module.findUnique({ where: { id: moduleId } });
      if (!module) return res.status(404).json({ message: 'Module not found' });

      const content = JSON.parse(module.content as string);
      
      // Start AI Review
      const review = await reviewProjectCode(module.title, content.projectIdea, code);

      const submission = await prisma.projectSubmission.create({
        data: {
          userId,
          moduleId,
          code,
          score: review.score,
          feedback: review.feedback,
          status: 'REVIEWED',
        },
      });

      // Award XP if score is good (e.g., > 70)
      if (review.score > 70) {
        await prisma.user.update({
          where: { id: userId },
          data: { totalPoints: { increment: 100 } }, // Projects award more XP
        });
      }

      logger.info(`Project submitted by user ${userId} for module ${moduleId}`);
      res.json({ submission, suggestions: review.suggestions });
    } catch (error: any) {
      logger.error(`Project submission failed: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  }

  static async getSubmissions(req: AuthRequest, res: Response) {
    try {
      const { moduleId } = req.params;
      const submissions = await prisma.projectSubmission.findMany({
        where: { userId: req.userId!, moduleId },
        orderBy: { createdAt: 'desc' },
      });
      res.json(submissions);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
