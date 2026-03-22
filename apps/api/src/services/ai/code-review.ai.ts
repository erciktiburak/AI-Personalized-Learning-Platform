import anthropic from './claude.service';
import { withRetry } from '../../utils/retry';

export interface CodeReviewResult {
  score: number;
  feedback: string;
  suggestions: string[];
}

export async function reviewProjectCode(
  moduleTitle: string,
  projectIdea: string,
  code: string
): Promise<CodeReviewResult> {
  return withRetry(async () => {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 2048,
      system: `You are an expert senior developer and code reviewer.
               Review the student's project code for the module: "${moduleTitle}".
               Project Goal: ${projectIdea}
               Provide a score (0-100), detailed feedback, and 3 specific suggestions for improvement.
               Always respond in valid JSON only.`,
      messages: [{
        role: "user",
        content: `Project Code to review:\n\n${code}`
      }]
    });

    const raw = response.content[0].type === "text" ? response.content[0].text : "{}";
    const parsed = JSON.parse(raw);
    
    return {
      score: parsed.score || 0,
      feedback: parsed.feedback || "Geri bildirim üretilemedi.",
      suggestions: parsed.suggestions || []
    };
  });
}
