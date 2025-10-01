import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ChatService {
  async sendMessage(message: string, onChunk: (text: string) => void) {
    const response = await fetch('https://sbgpt-aebdd7g7erd9hham.centralindia-01.azurewebsites.net/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) return;

    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      // Split buffer by SSE "data:" chunks
      const lines = buffer.split('\n');

      // Keep any incomplete chunk in buffer
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith('data:')) continue;

        const data = trimmed.replace(/^data:\s*/, '');

        if (data === '[DONE]') return;

        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) onChunk(content);
        } catch (e) {
          console.error('Error parsing SSE chunk', e);
        }
      }
    }
  }
}
