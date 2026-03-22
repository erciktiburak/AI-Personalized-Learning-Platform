import { Request, Response } from 'express';
import { SocialService } from '../services/social.service';

export class SocialController {
  static async getProfile(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const profile = await SocialService.getPublicProfile(id);
      if (!profile) return res.status(404).json({ message: 'User not found' });
      res.json(profile);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getFeed(req: Request, res: Response) {
    try {
      const feed = await SocialService.getFeed();
      res.json(feed);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
