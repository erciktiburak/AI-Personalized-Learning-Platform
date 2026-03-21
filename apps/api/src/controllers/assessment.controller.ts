import { Response } from 'express';
import { AssessmentService } from '../services/assessment.service';
import { AuthRequest } from '../middleware/auth.middleware';

export class AssessmentController {
  static async start(req: AuthRequest, res: Response) {
    try {
      const { topicId } = req.body;
      const assessment = await AssessmentService.startAssessment(req.userId!, topicId);
      res.status(201).json(assessment);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getStatus(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const assessment = await AssessmentService.getStatus(id);
      if (!assessment) return res.status(404).json({ message: 'Assessment not found' });
      res.json(assessment);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async submit(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { answers } = req.body;
      const result = await AssessmentService.submitAssessment(id, answers);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
