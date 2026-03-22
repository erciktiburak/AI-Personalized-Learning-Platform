import { Response } from 'express';
import { ModuleService } from '../services/module.service';
import { AuthRequest } from '../middleware/auth.middleware';

export class ModuleController {
  static async getById(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const module = await ModuleService.getById(id);
      if (!module) return res.status(404).json({ message: 'Module not found' });
      res.json(module);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
