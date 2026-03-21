import prisma from '../prisma/client';
import { assessmentQueue } from '../queues/assessment.queue';
import { learningPathQueue } from '../queues/learning-path.queue';

export class AssessmentService {
  static async startAssessment(userId: string, topicId: string) {
    const assessment = await prisma.assessment.create({
      data: {
        userId,
        topicId,
        status: 'GENERATING',
      },
    });

    await assessmentQueue.add('generate-questions', {
      userId,
      topicId,
      assessmentId: assessment.id,
    });

    return assessment;
  }

  static async getStatus(id: string) {
    return prisma.assessment.findUnique({
      where: { id },
      include: {
        questions: true,
      },
    });
  }

  static async submitAssessment(id: string, answers: any[]) {
    const assessment = await prisma.assessment.findUnique({
      where: { id },
      include: { questions: true },
    });

    if (!assessment) throw new Error('Assessment not found');
    if (assessment.status !== 'COMPLETED') throw new Error('Assessment not ready');

    let correctCount = 0;
    const questions = assessment.questions;

    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        correctCount++;
      }
    });

    const score = (correctCount / questions.length) * 100;
    
    let level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT' = 'BEGINNER';
    if (score > 90) level = 'EXPERT';
    else if (score > 70) level = 'ADVANCED';
    else if (score > 40) level = 'INTERMEDIATE';

    const result = await prisma.assessment.update({
      where: { id },
      data: {
        score,
        level,
        status: 'COMPLETED',
        completedAt: new Date(),
        answers: JSON.stringify(answers),
      },
    });

    await learningPathQueue.add('generate-path', {
      userId: assessment.userId,
      topicId: assessment.topicId,
      level,
      score,
      assessmentId: assessment.id,
    });

    return result;
  }
}
