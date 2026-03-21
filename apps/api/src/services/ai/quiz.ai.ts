import anthropic from './claude.service';
import { withRetry } from '../../utils/retry';

export interface QuizQuestion {
  question: string;
  type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE';
  options: string[];
  correctAnswer: string;
  explanation: string;
  points: number;
}

export async function generateAdaptiveQuiz(
  moduleTitle: string,
  keyConcepts: string[],
  userPerformance: number,
  count: number = 5
): Promise<QuizQuestion[]> {
  const difficulty = userPerformance > 80 ? "hard" :
                     userPerformance > 50 ? "medium" : "easy";

  return withRetry(async () => {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 4096,
      messages: [{
        role: "user",
        content: `
          Generate ${count} adaptive quiz questions for:
          - Module: "${moduleTitle}"
          - Key Concepts: ${keyConcepts.join(", ")}
          - Difficulty: ${difficulty} (user last score: ${userPerformance}/100)
          
          Respond ONLY with JSON array:
          [
            {
              "question": "...",
              "type": "MULTIPLE_CHOICE",
              "options": ["A", "B", "C", "D"],
              "correctAnswer": "B",
              "explanation": "...",
              "points": 10
            }
          ]
        `
      }]
    });

    const raw = response.content[0].type === "text" ? response.content[0].text : "";
    return JSON.parse(raw);
  });
}
