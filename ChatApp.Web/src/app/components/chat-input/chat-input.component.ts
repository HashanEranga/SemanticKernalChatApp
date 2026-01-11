import { Component, output, signal, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.css'
})
export class ChatInputComponent implements AfterViewInit {
  @ViewChild('textarea') textareaRef!: ElementRef<HTMLTextAreaElement>;

  readonly messageContent = signal('');
  readonly messageSent = output<string>();

  ngAfterViewInit(): void {
    this.adjustTextareaHeight();
  }

  onInput(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.messageContent.set(textarea.value);
    this.adjustTextareaHeight();
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  sendMessage(): void {
    const content = this.messageContent().trim();
    if (content) {
      this.messageSent.emit(content);
      this.messageContent.set('');
      this.resetTextareaHeight();
    }
  }

  private adjustTextareaHeight(): void {
    const textarea = this.textareaRef?.nativeElement;
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = Math.min(textarea.scrollHeight, 200);
      textarea.style.height = `${newHeight}px`;
    }
  }

  private resetTextareaHeight(): void {
    const textarea = this.textareaRef?.nativeElement;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.value = '';
    }
  }
}
