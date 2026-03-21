import { Response } from 'express';
import { LearningPathService } from '../services/learning-path.service';
import { AuthRequest } from '../middleware/auth.middleware';

export class LearningPathController {
  static async getAll(req: AuthRequest, res: Response) {
    try {
      const paths = await LearningPathService.getByUserId(req.userId!);
      res.json(paths);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getById(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const path = await LearningPathService.getById(id);
      if (!path) return res.status(404).json({ message: 'Learning path not found' });
      res.json(path);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
