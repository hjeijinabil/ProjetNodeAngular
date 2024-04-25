import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TtsService {

  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    window.addEventListener('unload', () => {
      this.stopSpeaking();
    });
  }

  speak(text: string): void {
    this.currentUtterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(this.currentUtterance);
  }

  stopSpeaking(): void {
    if (this.currentUtterance) {
      speechSynthesis.cancel();
      this.currentUtterance = null;
    }
  }
}
