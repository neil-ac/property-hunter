import { MCPClient } from "@mastra/mcp";
import path from "path";

if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not set");
}

// Configure MCP Client with local Resend email server
export const mcpClient = new MCPClient({
    id: "mcp-client",
    servers: {
      "resend-email": {
        // Use stdio transport for locally installed MCP servers
        command: "node",
        args: [path.resolve(process.cwd(), "../mcp-send-email/build/index.js")],
        env: {
          // Add your Resend API key here
          RESEND_API_KEY: process.env.RESEND_API_KEY || "",
          SENDER_EMAIL_ADDRESS: process.env.SENDER_EMAIL_ADDRESS || "",
        },
        enableServerLogs: true,
      },
      "melo-estate-search": {
        url: new URL("https://property-search-mcp-93912262.alpic.live/mcp"),
      },
    },
  });