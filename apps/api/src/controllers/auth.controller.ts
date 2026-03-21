import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthRequest } from '../middleware/auth.middleware';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { email, name, password } = req.body;
      const user = await AuthService.register(email, name, password);
      res.status(201).json({ 
        message: 'User registered successfully', 
        user: { id: user.id, email: user.email, name: user.name } 
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { user, accessToken, refreshToken } = await AuthService.login(email, password);
      res.json({
        user: { id: user.id, email: user.email, name: user.name },
        accessToken,
        refreshToken
      });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }

  static async refresh(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) return res.status(400).json({ message: 'Refresh token is required' });
      
      const tokens = await AuthService.refreshToken(refreshToken);
      res.json(tokens);
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }

  static async logout(req: AuthRequest, res: Response) {
    try {
      const { refreshToken } = req.body;
      const accessToken = req.token!;
      await AuthService.logout(accessToken, refreshToken);
      res.json({ message: 'Logged out successfully' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
