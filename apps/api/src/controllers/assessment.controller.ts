import { Response } from 'express';
import { AssessmentService } from '../services/assessment.service';
import { AuthRequest } from '../middleware/auth.middleware';
import { globalEvents, EVENTS } from '../utils/event-emitter';

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

  static async statusStream(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const userId = req.userId!;

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const onCompleted = (data: any) => {
      if (data.assessmentId === id && data.userId === userId) {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
        cleanup();
      }
    };

    const onFailed = (data: any) => {
      if (data.assessmentId === id && data.userId === userId) {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
        cleanup();
      }
    };

    const cleanup = () => {
      globalEvents.off(EVENTS.ASSESSMENT_COMPLETED, onCompleted);
      globalEvents.off(EVENTS.ASSESSMENT_FAILED, onFailed);
      res.end();
    };

    globalEvents.on(EVENTS.ASSESSMENT_COMPLETED, onCompleted);
    globalEvents.on(EVENTS.ASSESSMENT_FAILED, onFailed);

    req.on('close', cleanup);
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
