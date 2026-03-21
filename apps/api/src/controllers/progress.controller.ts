import { Response } from 'express';
import { ProgressService } from '../services/progress.service';
import { AuthRequest } from '../middleware/auth.middleware';

export class ProgressController {
  static async getStats(req: AuthRequest, res: Response) {
    try {
      const stats = await ProgressService.getStats(req.userId!);
      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
