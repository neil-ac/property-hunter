import { mastra } from "@/mastra"; // Adjust the import path if necessary
import { convertToModelMessages, createUIMessageStreamResponse } from "ai";
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
export async function POST(req: Request) {
  // Extract the messages from the request body
  const { messages } = await req.json();

  const agent = mastra.getAgent("propertyHunterAgent");

  // Stream the response using the agent with AI SDK format
  const result = await agent.stream(convertToModelMessages(messages), {
    format: "aisdk",
    onError: ({ error }: { error: unknown }) => {
      console.error("Mastra stream onError", error);
    },
  });
  
  // Return the result as a text stream response
  return createUIMessageStreamResponse({
    stream: result.toUIMessageStream(),
  });
  
}
