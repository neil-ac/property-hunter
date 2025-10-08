import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";

export const propertyHunterAgent = new Agent({
  name: "property-hunter-agent",
  instructions:
    "You are a property hunter. " +
    "You help people find properties that match their criteria.",
  model: openai("gpt-5-nano"),
});