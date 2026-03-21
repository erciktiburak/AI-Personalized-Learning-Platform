import { Response } from 'express';
import { QuizService } from '../services/quiz.service';
import { AuthRequest } from '../middleware/auth.middleware';

export class QuizController {
  static async getByModule(req: AuthRequest, res: Response) {
    try {
      const { moduleId } = req.params;
      const quiz = await QuizService.getByModuleId(moduleId, req.userId!);
      res.json(quiz);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async submit(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { answers, timeTaken } = req.body;
      const result = await QuizService.submitQuiz(id, req.userId!, answers, timeTaken);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
