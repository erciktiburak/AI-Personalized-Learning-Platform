import { Response } from 'express';
import { ModuleService } from '../services/module.service';
import { AuthRequest } from '../middleware/auth.middleware';
import prisma from '../prisma/client';

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

  static async update(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { title, description, content } = req.body;
      
      const updated = await prisma.module.update({
        where: { id },
        data: {
          title,
          description,
          content: content ? JSON.stringify(content) : undefined,
        },
      });
      
      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
