import { Request, Response } from 'express';
import { TopicService } from '../services/topic.service';

export class TopicController {
  static async getAll(req: Request, res: Response) {
    try {
      const topics = await TopicService.getAll();
      res.json(topics);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getBySlug(req: Request, res: Response) {
    try {
      const { slug } = req.params;
      const topic = await TopicService.getBySlug(slug);
      if (!topic) return res.status(404).json({ message: 'Topic not found' });
      res.json(topic);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
