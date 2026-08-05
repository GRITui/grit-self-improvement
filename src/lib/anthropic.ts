import Anthropic from "@anthropic-ai/sdk";

export type CheckinAnalysis = {
  summary: string;
  risk: "LOW" | "MEDIUM" | "HIGH";
  draft_reply: string;
};

const CHECKIN_ANALYSIS_SCHEMA = {
  type: "object",
  properties: {
    summary: {
      type: "string",
      description: "2-3 sentence summary of the client's check-in for the coach.",
    },
    risk: {
      type: "string",
      enum: ["LOW", "MEDIUM", "HIGH"],
      description:
        "Disengagement/dropout risk based on tone, effort, and any red flags in the answers.",
    },
    draft_reply: {
      type: "string",
      description:
        "A short, warm, specific draft reply the coach can edit and send. Never mentions that it was AI-generated.",
    },
  },
  required: ["summary", "risk", "draft_reply"],
  additionalProperties: false,
} as const;

export async function analyzeCheckin(
  questions: string[],
  answers: string[]
): Promise<CheckinAnalysis> {
  const client = new Anthropic();

  const qa = questions
    .map((q, i) => `Q: ${q}\nA: ${answers[i] ?? "(no answer)"}`)
    .join("\n\n");

  const response = await client.messages.create({
    model: "claude-opus-5",
    max_tokens: 1024,
    output_config: {
      effort: "medium",
      format: { type: "json_schema", schema: CHECKIN_ANALYSIS_SCHEMA },
    },
    messages: [
      {
        role: "user",
        content: `You are helping a coach triage a client's check-in. Analyze the following Q&A and produce a summary, a disengagement/dropout risk level, and a draft reply.\n\n${qa}`,
      },
    ],
  });

  if (response.stop_reason === "refusal") {
    throw new Error("Claude declined to analyze this check-in.");
  }

  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text content in Claude's response.");
  }

  return JSON.parse(textBlock.text) as CheckinAnalysis;
}
