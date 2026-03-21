import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { isTokenBlacklisted } from '../utils/token';

export interface AuthRequest extends Request {
  userId?: string;
  token?: string;
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  // Check Authorization header or query parameter (for SSE)
  const token = req.headers.authorization?.split(' ')[1] || (req.query.token as string);

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Check if token is blacklisted
  const blacklisted = await isTokenBlacklisted(token);
  if (blacklisted) {
    return res.status(401).json({ message: 'Token is no longer valid' });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: string };
    req.userId = decoded.userId;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
