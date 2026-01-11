export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isStreaming?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

// Backend API models
export interface ChatHistoryItem {
  role: string;
  content: string;
}

export interface ChatRequest {
  prompt: string;
  chatHistory: ChatHistoryItem[];
}

export interface TextContent {
  $type: string;
  text: string;
}

export interface ChatResponse {
  role: { label: string };
  items: TextContent[];
  modelId: string;
  metadata: Record<string, any>;
}
