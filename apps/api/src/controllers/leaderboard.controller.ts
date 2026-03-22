import { Request, Response } from 'express';
import prisma from '../prisma/client';

export class LeaderboardController {
  static async getGlobal(req: Request, res: Response) {
    try {
      const topUsers = await prisma.user.findMany({
        take: 10,
        orderBy: { totalPoints: 'desc' },
        select: {
          id: true,
          name: true,
          totalPoints: true,
          streak: true,
          image: true,
        },
      });
      res.json(topUsers);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
