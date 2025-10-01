import { Component } from '@angular/core';
import { ChatComponent } from './chat/chat';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChatComponent],
  template: `<app-chat></app-chat>`
})
export class AppComponent {}
