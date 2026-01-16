import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { ChatMessage, Conversation, ChatRequest, ChatHistoryItem, ChatResponse } from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:5239/api/chat';

  private readonly conversation = signal<Conversation>(this.createEmptyConversation());
  private readonly isLoading = signal(false);
  private chatHistory: ChatHistoryItem[] = [];

  readonly activeConversation = this.conversation.asReadonly();
  readonly loading = this.isLoading.asReadonly();

  private createEmptyConversation(): Conversation {
    return {
      id: crypto.randomUUID(),
      title: 'Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  sendMessage(content: string): Observable<ChatResponse> {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      content,
      role: 'user',
      timestamp: new Date()
    };

    this.addMessage(userMessage);
    this.isLoading.set(true);

    const request: ChatRequest = {
      prompt: content,
      chatHistory: this.chatHistory
    };

    return this.http.post<ChatResponse>(this.apiUrl, request).pipe(
      tap(response => {
        // Extract text from items array
        const responseText = response.items
          ?.filter(item => item.$type === 'TextContent')
          ?.map(item => item.text)
          ?.join('') || '';

        // Add user message to history
        this.chatHistory.push({ role: 'user', content });

        // Add assistant response to history
        this.chatHistory.push({ role: 'assistant', content: responseText });

        // Add assistant message to UI
        const assistantMessage: ChatMessage = {
          id: crypto.randomUUID(),
          content: responseText,
          role: 'assistant',
          timestamp: new Date()
        };
        this.addMessage(assistantMessage);
        this.isLoading.set(false);
      }),
      catchError(error => {
        this.isLoading.set(false);
        console.error('Chat API error:', error);
        return throwError(() => error);
      })
    );
  }

  private addMessage(message: ChatMessage): void {
    this.conversation.update(conv => ({
      ...conv,
      messages: [...conv.messages, message],
      updatedAt: new Date()
    }));
  }

  clearChat(): void {
    this.conversation.set(this.createEmptyConversation());
    this.chatHistory = [];
  }
}
