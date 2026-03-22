import { Response } from 'express';
import { ChatService } from '../services/chat.service';
import { AuthRequest } from '../middleware/auth.middleware';

export class ChatController {
  static async getHistory(req: AuthRequest, res: Response) {
    try {
      const { moduleId } = req.params;
      const history = await ChatService.getHistory(req.userId!, moduleId);
      res.json(history);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async sendMessage(req: AuthRequest, res: Response) {
    try {
      const { moduleId } = req.params;
      const { content } = req.body;
      const response = await ChatService.sendMessage(req.userId!, moduleId, content);
      res.json(response);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
