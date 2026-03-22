import { Request, Response } from 'express';
import { TopicService } from '../services/topic.service';

export class TopicController {
  static async getAll(req: Request, res: Response) {
    try {
      const { q } = req.query;
      if (q) {
        const topics = await TopicService.search(q as string);
        return res.json(topics);
      }
      const topics = await TopicService.getAll();
      res.json(topics);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getBySlug(req: Request, res: Response) {
...
