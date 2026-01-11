import { Component, input } from '@angular/core';
import { ChatMessage } from '../../models/chat.model';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.css'
})
export class ChatMessageComponent {
  readonly message = input.required<ChatMessage>();

  formatTime(date: Date): string {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
