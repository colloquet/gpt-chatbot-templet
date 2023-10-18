import { Message, ReplicateStream, StreamingTextResponse } from "ai";
import { experimental_buildLlama2Prompt } from "ai/prompts";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY || "",
});

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages, systemPrompt } = await req.json();

    const prompt = [
      {
        role: "system",
        content: systemPrompt,
      },
    ];

    const response = await replicate.predictions.create({
      stream: true,
      version:
        "52551facc68363358effaacb0a52b5351843e2d3bf14f58aff5f0b82d756078c",
      input: {
        prompt: experimental_buildLlama2Prompt([
          ...prompt,
          ...messages.filter((message: Message) => message.role !== "system"),
        ]),
      },
    });

    const stream = await ReplicateStream(response);

    return new StreamingTextResponse(stream);
  } catch (error) {
    throw error;
  }
}
