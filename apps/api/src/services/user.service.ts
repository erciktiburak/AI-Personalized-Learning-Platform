import prisma from '../prisma/client';

export class UserService {
  static async getById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, name: true, streak: true, avatarUrl: true },
    });
  }

  static async update(id: string, data: { name?: string; avatarUrl?: string }) {
    return prisma.user.update({
      where: { id },
      data,
      select: { id: true, email: true, name: true, streak: true, avatarUrl: true },
    });
  }
}
