import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { mcpClient } from "../mcp/mcpClient";

export const readMCPResourceTool = createTool({
  id: "read-mcp-resource",
  description: "Read content from MCP resources. For URI resource templates with parameters (e.g., 'email-template://property-inquiry/{property_reference}'), provide the full URI with values substituted.",
  inputSchema: z.object({
    serverName: z.string().describe("MCP server name (e.g., 'resend-email')"),
    uri: z.string().describe("Full resource URI with parameters substituted (e.g., 'email-template://property-inquiry/ABC123')")
  }),
  outputSchema: z.object({
    content: z.any().describe("Parsed content (JSON if mimeType is application/json, otherwise raw text/blob)")
  }),
  execute: async ({ context }) => {
    const result = await mcpClient.resources.read(
      context.serverName,
      context.uri
    );

    const firstContent = result.contents[0];
    const rawContent = (firstContent?.text ?? firstContent?.blob ?? "") as string;
    
    // Parse JSON if mimeType indicates it's JSON
    if (firstContent?.mimeType === 'application/json' && firstContent?.text) {
      try {
        return { content: JSON.parse(firstContent.text as string) };
      } catch (_error) {
        return { content: rawContent };
      }
    }
    
    return { content: rawContent };
  }
});

