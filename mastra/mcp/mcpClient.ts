import { MCPClient } from "@mastra/mcp";

if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not set");
}

// Configure MCP Client with local Resend email server
export const mcpClient = new MCPClient({
    id: "mcp-client",
    servers: {
      "resend-email": {
        url: new URL("https://send-email-mcp-6f0ec13f.alpic.live/mcp"),
        requestInit: {
          headers: {
            "X-RESEND-API-KEY": process.env.RESEND_API_KEY || "",
            "X-SENDER-EMAIL": process.env.SENDER_EMAIL_ADDRESS || "",
          },
        }
      },
      "melo-estate-search": {
        url: new URL("https://property-search-mcp-93912262.alpic.live/mcp"),
        requestInit: {
          headers: {
            "X-API-KEY": process.env.MELO_API_KEY || "",
          },
        },
      },
    },
  });