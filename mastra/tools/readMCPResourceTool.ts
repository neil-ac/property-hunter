import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { mcpClient } from "../mcp/mcpClient";

export const readMCPResourceTool = createTool({
  id: "read-mcp-resource",
  description: "Read content from MCP resources and resource templates. Use this tool to fetch the actual content after identifying available resources/templates using the list tool. For static resources, provide the exact URI (e.g., 'greetings://welcome'). For resource templates with parameters (e.g., 'greetings://{name}'), substitute the parameters with actual values (e.g., 'greetings://Neil').",
  inputSchema: z.object({
    serverName: z.string().describe("MCP server name (e.g., 'my-mcp-server')"),
    uri: z.string().describe("Resource URI. For static resources, use the exact URI from the list. For templates, substitute parameters with actual values (e.g., replace '{name}' with 'Neil')")
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

