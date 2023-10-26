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
        "ac944f2e49c55c7e965fc3d93ad9a7d9d947866d6793fb849dd6b4747d0c061c",
      input: {
        prompt: experimental_buildLlama2Prompt([
          ...prompt,
          ...messages.filter((message: Message) => message.role !== "system"),
        ]),
        max_new_tokens: 800,
      },
    });

    const stream = await ReplicateStream(response);

    return new StreamingTextResponse(stream);
  } catch (error) {
    throw error;
  }
}
