import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/client';
import { EmailService } from './email.service';
import { env } from '../config/env';
import { generateTokens, blacklistToken } from '../utils/token';

export class AuthService {
  static async register(email: string, name: string, password: string) {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new Error('User already exists');

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
      },
    });

    try {
      await EmailService.sendWelcomeEmail(email, name);
    } catch (e) {
      console.error('Welcome email failed', e);
    }

    return user;
  }

  static async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) throw new Error('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) throw new Error('Invalid credentials');

    const tokens = generateTokens(user.id);

    return { user, ...tokens };
  }

  static async refreshToken(oldRefreshToken: string) {
    try {
      const decoded = jwt.verify(oldRefreshToken, env.JWT_REFRESH_SECRET) as { userId: string };
      const tokens = generateTokens(decoded.userId);
      
      // Blacklist the old refresh token for its remaining life
      await blacklistToken(oldRefreshToken, 7 * 24 * 60 * 60);

      return tokens;
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  static async logout(accessToken: string, refreshToken: string) {
    if (accessToken) await blacklistToken(accessToken, 15 * 60);
    if (refreshToken) await blacklistToken(refreshToken, 7 * 24 * 60 * 60);
  }
}
