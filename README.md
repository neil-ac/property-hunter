# Property Hunter Agent

A property hunting assistant built with [assistant-ui](https://github.com/Yonom/assistant-ui) and [Mastra](https://mastra.ai), enhanced with MCP (Model Context Protocol) server capabilities.

## Agent Setup

This project uses a Mastra agent powered by OpenAI to help you find and manage property searches.

### Prerequisites

1. **OpenAI API Key**: Sign up at [platform.openai.com](https://platform.openai.com) and create an API key

2. **Environment Variables**: Create a `.env` file (copy from .env.example) in the project root:

```bash
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  # Optional: For email capabilities
MELO_API_KEY="your_api_key_here"  # Optional: For property search in France
```

### Running the Agent

```bash
npm install
npm run dev
# or
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to start chatting with your property hunting agent.

## MCP Server Capabilities

This property hunter agent's capabilities are extendend by connecting MCP servers. Each server provides specialized tools that the agent can use autonomously.

### Email Capabilities - Resend MCP Server

The [Resend MCP Server](https://github.com/neil-ac/send-email-mcp) enables your agent to compose and send emails directly using the [Resend](https://resend.com) email API.

**What the agent can do:**
- Send plain text and HTML emails
- Schedule emails for future delivery
- Add CC and BCC recipients
- Configure reply-to addresses
- List Resend audiences

**Example prompts:**

*"Send an email to john@example.com with the top 3 properties I'm interested in from our conversation."*

*"Draft and send a professional email to the property agent requesting a viewing for the apartment on 5th Avenue next Tuesday at 2 PM."*

*"Schedule an email to remind me tomorrow morning about following up with the landlord of that Brooklyn loft."*

#### Setup

This MCP server is deployed and ready to use - no local installation required!

**Step 1: Get your Resend API Key:**

1. Create a free account at [resend.com](https://resend.com)
2. Create an API Key
3. (Optional) Verify your domain to send to any email address

**Step 2: Add your Resend API key to `.env`:**

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

The server is already configured in `mastra/mcp/mcpClient.ts` and will automatically connect when you provide the API key.

### Property Search Capabilities - Melo API MCP Server

The [Property Search MCP Server](https://github.com/neil-ac/property-search-mcp) enables your agent to search for real estate properties in France using the Melo (notif.immo) API.

**What the agent can do:**
- Search for apartments and houses for sale or rent
- Filter by price range, surface area, and location
- Search by French zip codes
- Filter by number of bedrooms
- Calculate and filter by price per square meter
- Sort results by price, price per meter, or recently updated
- Paginate through search results

**Example prompts:**

*"Find apartments for sale in Paris 11th arrondissement with at least 2 bedrooms under 500,000€"*

*"Show me houses for rent in Paris with a minimum of 80m² surface area"*

*"Search for properties in the 75018 zip code sorted by price per meter"*

#### Setup

This MCP server is deployed and ready to use - no local installation required!

**Step 1: Get your Melo API Key:**

Obtain a Melo API key from [notif.immo](https://www.notif.immo/).

**Step 2: Add your Melo API key to `.env`:**

```bash
MELO_API_KEY="your_api_key_here"
```

The server is already configured in `mastra/mcp/mcpClient.ts` and will automatically connect when you provide the API key.

## Project Structure

```
property-hunter/
├── app/                    # Next.js app directory
│   ├── api/chat/          # Chat API route
│   └── assistant.tsx      # Main assistant UI component
├── components/            # UI components
│   └── assistant-ui/      # Assistant-specific components
├── mastra/               # Mastra agent configuration
│   ├── agents/           # Agent definitions
│   └── mcp/             # MCP client configuration
└── .env.local           # Environment variables (create this)
```

## Learn More

- [Mastra Documentation](https://mastra.ai)
- [assistant-ui Documentation](https://github.com/Yonom/assistant-ui)
- [MCP Protocol](https://modelcontextprotocol.io)
- [Resend MCP Server](https://github.com/resend/mcp-send-email)
- [Property Search MCP Server](https://github.com/neil-ac/property-search-mcp)
