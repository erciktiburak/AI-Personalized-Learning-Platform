import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { email, name, password } = req.body;
      const user = await AuthService.register(email, name, password);
      res.status(201).json({ message: 'User registered successfully', user: { id: user.id, email: user.email, name: user.name } });
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
}
