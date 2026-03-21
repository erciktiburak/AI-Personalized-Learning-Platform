import anthropic from './claude.service';
import { withRetry } from '../../utils/retry';

export interface AssessmentQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: number;
}

export async function generateAssessmentQuestions(
  topic: string,
  count: number = 10
): Promise<AssessmentQuestion[]> {
  return withRetry(async () => {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 4096,
      messages: [{
        role: "user",
        content: `
          Generate ${count} assessment questions for the topic: "${topic}".
          
          Requirements:
          - Mix of difficulty levels (beginner: 3, intermediate: 4, advanced: 3)
          - Question types: multiple choice (4 options)
          - Include correct answer and detailed explanation
          
          Respond ONLY with a JSON array, no markdown, no preamble:
          [
            {
              "question": "...",
              "options": ["A", "B", "C", "D"],
              "correctAnswer": "A",
              "explanation": "...",
              "difficulty": 1
            }
          ]
        `
      }]
    });

    const raw = response.content[0].type === "text" ? response.content[0].text : "";
    return JSON.parse(raw);
  });
}
