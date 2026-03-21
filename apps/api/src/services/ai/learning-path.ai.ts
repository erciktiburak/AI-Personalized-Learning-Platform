import anthropic from './claude.service';
import { withRetry } from '../../utils/retry';

export interface ModuleData {
  title: string;
  description: string;
  order: number;
  estimatedHours: number;
  keyConcepts: string[];
  projectIdea: string;
}

export interface LearningPathData {
  title: string;
  description: string;
  totalEstimatedHours: number;
  modules: ModuleData[];
}

export async function generateLearningPath(
  topic: string,
  userLevel: string,
  assessmentScore: number
): Promise<LearningPathData> {
  return withRetry(async () => {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 8192,
      system: `You are an expert curriculum designer. 
               Create personalized, structured learning paths based on the user's skill level.
               Always respond in valid JSON only.`,
      messages: [{
        role: "user",
        content: `
          Create a personalized learning path for:
          - Topic: ${topic}
          - User Level: ${userLevel}
          - Assessment Score: ${assessmentScore}/100
          
          Generate a learning path with 6-8 modules.
          Each module should have:
          - Title and description
          - Estimated hours (1-5)
          - Key concepts to learn (array of strings)
          - Practical project idea
          
          Respond ONLY with JSON:
          {
            "title": "...",
            "description": "...",
            "totalEstimatedHours": 40,
            "modules": [
              {
                "title": "...",
                "description": "...",
                "order": 1,
                "estimatedHours": 3,
                "keyConcepts": ["...", "..."],
                "projectIdea": "..."
              }
            ]
          }
        `
      }]
    });

    const raw = response.content[0].type === "text" ? response.content[0].text : "";
    return JSON.parse(raw);
  });
}
