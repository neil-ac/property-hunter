import { Mastra } from "@mastra/core";
import { propertyHunterAgent } from "./agents/propertyHunterAgent";

export const mastra = new Mastra({
  agents: { propertyHunterAgent },
  telemetry: {
    enabled: false,
  },
});