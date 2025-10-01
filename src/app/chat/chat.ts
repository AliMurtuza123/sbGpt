import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="chat-container">
      <h2 class="heading">Sanober's GPT</h2>
      <textarea
        [(ngModel)]="userMessage"
        placeholder="Type your message..."
      ></textarea>
      <button (click)="send()">Send</button>

      <div class="bot-reply">
        <p>{{ botReply }}</p>
      </div>
    </div>
  `,
  styles: [
    `
      .chat-container {
        max-width: 600px;
        margin: 20px auto;
        display: flex;
        flex-direction: column;
        gap: 10px;
        font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif;
      }
      .heading {
        text-align: center;
        color: #1d2022ff;
      }
      textarea {
        width: 100%;
        height: 100px;
        padding: 10px;
      }
      button {
        align-self: flex-start;
        padding: 8px 16px;
        background: #1d2022ff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      button:hover {
        background: #005fa3;
      }
      .bot-reply {
        margin-top: 20px;
        padding: 15px;
        background: #f3f3f3;
        border-radius: 6px;
      }
    `,
  ],
})
export class ChatComponent {
  userMessage = '';
  botReply = '';

  constructor(private chatService: ChatService) {}

  async send() {
    this.botReply = '';
    await this.chatService.sendMessage(this.userMessage, (chunk) => {
      this.botReply += chunk;
    });
  }
}
