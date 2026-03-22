import anthropic from './claude.service';
import { withRetry } from '../../utils/retry';

export async function getMentorResponse(
  moduleTitle: string,
  keyConcepts: string[],
  history: { role: 'user' | 'assistant', content: string }[],
  userMessage: string
): Promise<string> {
  return withRetry(async () => {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1024,
      system: `You are an expert AI Mentor for the learning module: "${moduleTitle}".
               Key concepts for this module: ${keyConcepts.join(", ")}.
               Your goal is to help the student understand these concepts, answer their questions, 
               and guide them through the module. Be encouraging, clear, and concise.`,
      messages: [
        ...history,
        { role: 'user', content: userMessage }
      ]
    });

    return response.content[0].type === "text" ? response.content[0].text : "Üzgünüm, şu an yanıt veremiyorum.";
  });
}
