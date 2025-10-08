# Property Hunter Agent

A property hunting assistant built with [assistant-ui](https://github.com/Yonom/assistant-ui) and [Mastra](https://mastra.ai), enhanced with MCP (Model Context Protocol) server capabilities.

## Agent Setup

This project uses a Mastra agent powered by OpenAI to help you find and manage property searches.

### Prerequisites

1. **OpenAI API Key**: Sign up at [platform.openai.com](https://platform.openai.com) and create an API key

2. **Environment Variables**: Create a `.env` file (copy from .env.example) in the project root:

```bash
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
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

The [Resend MCP Server](https://github.com/resend/mcp-send-email) enables your agent to compose and send emails directly.

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

#### Installation

**Step 1: Clone and build the MCP server** :
```bash
cd ../
git clone https://github.com/resend/mcp-send-email.git
cd mcp-send-email
npm install
npm run build
```

> **Important:** The MCP server path in `mastra/mcp/mcpClient.ts` is relative (`../mcp-send-email/build/index.js`). If you install it elsewhere, update the path to an absolute path pointing to your installation.

For detailed setup instructions, see the [Resend MCP Server documentation](https://github.com/resend/mcp-send-email).

**Step 2 (Optional): Setup Resend:**
1. Create a free account at [resend.com](https://resend.com)
2. Create an API Key
3. (Optional) Verify your domain to send to any email address

**Step 3: Add your Resend API key to `.env`:**
```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

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
