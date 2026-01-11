import { Component, inject, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { ChatInputComponent } from '../chat-input/chat-input.component';

@Component({
  selector: 'app-chat-container',
  standalone: true,
  imports: [ChatMessageComponent, ChatInputComponent],
  templateUrl: './chat-container.component.html',
  styleUrl: './chat-container.component.css'
})
export class ChatContainerComponent implements AfterViewChecked {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef<HTMLDivElement>;

  private readonly chatService = inject(ChatService);
  private shouldScrollToBottom = false;

  readonly conversation = this.chatService.activeConversation;
  readonly isLoading = this.chatService.loading;

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  onSendMessage(content: string): void {
    this.shouldScrollToBottom = true;
    this.chatService.sendMessage(content).subscribe({
      next: () => {
        this.shouldScrollToBottom = true;
      }
    });
  }

  private scrollToBottom(): void {
    const container = this.messagesContainer?.nativeElement;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }
}
