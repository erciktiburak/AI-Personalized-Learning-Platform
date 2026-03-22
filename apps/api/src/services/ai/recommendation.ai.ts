import anthropic from './claude.service';
import { withRetry } from '../../utils/retry';

export interface Recommendation {
  title: string;
  type: 'article' | 'video' | 'documentation';
  url: string;
  reason: string;
}

export async function getPersonalizedRecommendations(
  moduleTitle: string,
  weakConcepts: string[]
): Promise<Recommendation[]> {
  if (weakConcepts.length === 0) return [];

  return withRetry(async () => {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1024,
      system: `You are a helpful education assistant. 
               Based on the concepts the student is struggling with, recommend 3 high-quality learning resources.
               Always respond in valid JSON only.`,
      messages: [{
        role: "user",
        content: `
          The student is learning about "${moduleTitle}" but struggled with these specific concepts: ${weakConcepts.join(", ")}.
          
          Recommend 3 resources (YouTube videos, official documentation, or technical articles).
          
          Respond ONLY with JSON:
          [
            {
              "title": "...",
              "type": "video",
              "url": "...",
              "reason": "Bu video, [konu] kavramını görsel olarak çok iyi açıklıyor."
            }
          ]
        `
      }]
    });

    const raw = response.content[0].type === "text" ? response.content[0].text : "[]";
    return JSON.parse(raw);
  });
}
