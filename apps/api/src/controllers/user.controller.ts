import { Response } from 'express';
import { UserService } from '../services/user.service';
import { AuthRequest } from '../middleware/auth.middleware';

export class UserController {
  static async getMe(req: AuthRequest, res: Response) {
    try {
      const user = await UserService.getById(req.userId!);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateMe(req: AuthRequest, res: Response) {
    try {
      const { name, avatarUrl } = req.body;
      const user = await UserService.update(req.userId!, { name, avatarUrl });
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
