import { env } from "../config/env";

export interface GroundedSource {
  title: string;
  chapter?: string;
  page?: number;
  chunkId?: string;
}

export interface AIReply {
  answer: string;
  sources: GroundedSource[];
}

export interface AIProvider {
  chat(input: string, context?: GroundedSource[]): Promise<AIReply>;
}

class DemoAIProvider implements AIProvider {
  async chat(input: string, context: GroundedSource[] = []): Promise<AIReply> {
    const normalized = input.toLowerCase();
    let answer = "I can help you revise this topic. Start with the core definition, connect it to an example, and then test yourself with a short question.";
    if (normalized.includes("newton")) {
      answer = "Newton's laws describe how forces affect the motion of objects. For revision, remember: the first law describes inertia, the second links force, mass and acceleration, and the third describes action-reaction pairs. Try explaining each law in your own words before attempting a numerical problem.";
    } else if (normalized.includes("photosynthesis")) {
      answer = "Photosynthesis is the process by which green plants use light energy to build carbohydrates from carbon dioxide and water, releasing oxygen as a by-product. For revision, connect the light reactions with carbon fixation and then test yourself on the role of chlorophyll.";
    } else if (normalized.includes("study") || normalized.includes("revise")) {
      answer = "Use a 3-step cycle: 15 minutes of concept revision, 15 minutes of practice questions, and 5 minutes reviewing mistakes. Repeat the cycle for your weakest topic first.";
    }
    return {
      answer,
      sources: context.length ? context : [{ title: "Approved learning content", chapter: "Demo knowledge base", page: 1, chunkId: "demo-1" }]
    };
  }
}

class OpenAICompatibleProvider implements AIProvider {
  async chat(input: string, context: GroundedSource[] = []): Promise<AIReply> {
    const response = await fetch(`${env.aiBaseUrl}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.aiApiKey}` },
      body: JSON.stringify({
        model: env.aiModel,
        temperature: 0.2,
        messages: [
          { role: "system", content: "You are a grounded NCERT revision tutor. Use only the supplied approved context for factual educational claims. If context is insufficient, say so. Explain clearly for Class 11-12 students." },
          { role: "user", content: `Approved context metadata: ${JSON.stringify(context)}\n\nStudent question: ${input}` }
        ]
      })
    });
    if (!response.ok) throw new Error("AI provider request failed");
    const data = await response.json() as any;
    return { answer: data.choices?.[0]?.message?.content ?? "No answer returned.", sources: context };
  }
}

export function getAIProvider(): AIProvider {
  return env.aiProvider === "openai" && env.aiApiKey && env.aiModel
    ? new OpenAICompatibleProvider()
    : new DemoAIProvider();
}
