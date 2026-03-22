import prisma from '../prisma/client';
import { getMentorResponse } from './ai/chat.ai';

export class ChatService {
  static async getHistory(userId: string, moduleId: string) {
    return prisma.chatMessage.findMany({
      where: { userId, moduleId },
      orderBy: { createdAt: 'asc' },
    });
  }

  static async sendMessage(userId: string, moduleId: string, content: string) {
    const module = await prisma.module.findUnique({ where: { id: moduleId } });
    if (!module) throw new Error('Module not found');

    const history = await prisma.chatMessage.findMany({
      where: { userId, moduleId },
      orderBy: { createdAt: 'asc' },
      take: 10, // Only last 10 messages for context
    });

    const formattedHistory = history.map(m => ({
      role: m.role.toLowerCase() as 'user' | 'assistant',
      content: m.content
    }));

    const moduleContent = JSON.parse(module.content as string);
    const aiResponse = await getMentorResponse(
      module.title,
      moduleContent.keyConcepts,
      formattedHistory,
      content
    );

    // Save both messages
    await prisma.chatMessage.create({
      data: { userId, moduleId, role: 'USER', content },
    });

    const assistantMsg = await prisma.chatMessage.create({
      data: { userId, moduleId, role: 'ASSISTANT', content: aiResponse },
    });

    return assistantMsg;
  }
}
