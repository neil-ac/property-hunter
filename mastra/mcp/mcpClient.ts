import { MCPClient } from "@mastra/mcp";

if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not set");
}

if (!process.env.MELO_API_KEY) {
    throw new Error("MELO_API_KEY is not set");
}

// Configure MCP Client with local Resend email server
export const mcpClient = new MCPClient({
    id: "mcp-client",
    servers: {
      "resend-email": {
        url: new URL("https://simple-node-mcp-serv-6a18beb1.alpic.live"),
        requestInit: {
          headers: {
            'X-RESEND-API-KEY': process.env.RESEND_API_KEY || "",
          },
        }
      },
      "melo-estate-search": {
        url: new URL("https://property-search-mcp-93912262.alpic.live"),
        requestInit: {
          headers: {
            "X-API-KEY": process.env.MELO_API_KEY || "",
          },
        },
      },
    },
  });