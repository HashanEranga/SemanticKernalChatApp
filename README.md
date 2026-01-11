# SK-DEV ChatApp

A modern AI-powered chat application built with **.NET Aspire**, **Semantic Kernel**, and **Angular**. Talk to GPT-4o-mini through a sleek, responsive interface with full conversation memory.

```
   _____  __ __        ____   _______    __
  / ___/ / //_/ ____  / __ \ / ____/ |  / /
  \__ \ / ,<   /___/ / / / // __/  | | / /
 ___/ // /| |       / /_/ // /___  | |/ /
/____//_/ |_|      /_____//_____/  |___/
        ChatApp - AI Conversations Made Simple
```

## What's Inside?

| Project | Description |
|---------|-------------|
| `ChatApp.AppHost` | .NET Aspire orchestrator - manages all services |
| `ChatApp.Api` | Backend API powered by Semantic Kernel |
| `ChatApp.Web` | Angular 21 frontend with modern UI |
| `ChatApp.ServiceDefaults` | Shared service configurations |

## Features

- **Conversational AI** - Chat with Azure OpenAI's GPT-4o-mini
- **Chat History** - Full context awareness across messages
- **Markdown Support** - Responses rendered with proper formatting
- **Real-time UI** - Instant message updates with loading indicators
- **Aspire Dashboard** - Monitor all services in one place

## Quick Start

### Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/download)
- [Node.js 20+](https://nodejs.org/)
- [Azure OpenAI Service](https://azure.microsoft.com/en-us/products/ai-services/openai-service) access

### 1. Configure Azure OpenAI

Copy the example config and add your credentials:

```bash
cp ChatApp.Api/appsettings.Example.json ChatApp.Api/appsettings.json
```

Edit `appsettings.json`:
```json
{
  "AzureOpenAI": {
    "DeploymentName": "gpt-4o-mini",
    "Endpoint": "https://your-resource.openai.azure.com/",
    "ApiKey": "your-api-key"
  }
}
```

### 2. Install Frontend Dependencies

```bash
cd ChatApp.Web
npm install
```

### 3. Run with Aspire

```bash
cd ChatApp.AppHost
dotnet run
```

Open the **Aspire Dashboard** (usually `https://localhost:17178`) to see all services running.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    .NET Aspire Host                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   ┌──────────────┐              ┌──────────────────┐    │
│   │   Angular    │    HTTP      │    .NET API      │    │
│   │   Frontend   │ ──────────►  │  Semantic Kernel │    │
│   │  (Port 4200) │              │   (Port 7112)    │    │
│   └──────────────┘              └────────┬─────────┘    │
│                                          │              │
│                                          ▼              │
│                                 ┌──────────────────┐    │
│                                 │   Azure OpenAI   │    │
│                                 │    GPT-4o-mini   │    │
│                                 └──────────────────┘    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## API Reference

### POST `/api/chat`

Send a message and receive an AI response.

**Request:**
```json
{
  "prompt": "Why is the sky blue?",
  "chatHistory": [
    { "role": "user", "content": "Hello" },
    { "role": "assistant", "content": "Hi! How can I help?" }
  ]
}
```

**Response:**
```json
{
  "role": { "label": "Assistant" },
  "items": [
    { "$type": "TextContent", "text": "The sky appears blue due to..." }
  ],
  "modelId": "gpt-4o-mini"
}
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Orchestration | .NET Aspire |
| Backend | ASP.NET Core 9, Semantic Kernel |
| AI | Azure OpenAI (GPT-4o-mini) |
| Frontend | Angular 21, TypeScript, Signals |
| Styling | CSS3 with modern design |

## Development

**Run API only:**
```bash
cd ChatApp.Api
dotnet run
```

**Run Angular only:**
```bash
cd ChatApp.Web
npm start
```

**Run tests:**
```bash
cd ChatApp.Web
npm test
```

## License

MIT

---

Built with Semantic Kernel + Angular + a lot of curiosity about AI
