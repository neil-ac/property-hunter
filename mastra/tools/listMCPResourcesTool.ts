import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { mcpClient } from "../mcp/mcpClient";

export const listMCPResourcesTool = createTool({
  id: "list-mcp-resources",
  description: "List all available resources and resource templates from MCP servers. Optionally filter by server name. Templates are URI patterns with parameters that can be used to construct resource URIs.",
  inputSchema: z.object({
    serverName: z.string().optional().describe("Optional MCP server name to filter resources (e.g., 'my-mcp-server'). If not provided, returns resources from all servers.")
  }),
  outputSchema: z.object({
    resources: z.record(z.array(z.object({
      uri: z.string().describe("The URI of the resource (e.g., 'greetings://welcome')"),
      name: z.string().describe("The name of the resource"),
      mimeType: z.string().optional().describe("The MIME type of the resource"),
      description: z.string().optional().describe("Description of the resource")
    }))).describe("Resources grouped by server name"),
    templates: z.record(z.array(z.object({
      uriTemplate: z.string().describe("URI template with parameters (e.g., 'greetings://{name}'). Use this to construct the actual URI by substituting the parameters with actual values (e.g., 'greetings://Neil')."),
      name: z.string().describe("The name of the template"),
      mimeType: z.string().optional().describe("The MIME type of the resource"),
      description: z.string().optional().describe("Description of the template")
    }))).describe("Resource templates grouped by server name")
  }),
  execute: async ({ context }) => {
    // Get all resources and templates from all servers
    const allResources = await mcpClient.resources.list();
    const allTemplates = await mcpClient.resources.templates();
    
    // If serverName is provided, filter to just that server
    if (context.serverName) {
      const serverResources = allResources[context.serverName];
      const serverTemplates = allTemplates[context.serverName];
      
      return { 
        resources: serverResources ? { [context.serverName]: serverResources } : {},
        templates: serverTemplates ? { [context.serverName]: serverTemplates } : {}
      };
    }
    
    // Return all resources and templates from all servers
    return { 
      resources: allResources,
      templates: allTemplates
    };
  }
});

