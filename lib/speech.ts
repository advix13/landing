import { playSound } from './sounds';

class SpeechService {
  private synthesis: SpeechSynthesis;
  private utterance: SpeechSynthesisUtterance | null = null;
  private defaultVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    this.synthesis = window.speechSynthesis;
    this.loadVoices();
    
    if (this.synthesis.onvoiceschanged !== undefined) {
      this.synthesis.onvoiceschanged = this.loadVoices.bind(this);
    }
  }

  private loadVoices() {
    const voices = this.synthesis.getVoices();
    const targetVoice = voices.find(voice => voice.name === 'Google UK English Female');
    this.defaultVoice = targetVoice || voices.find(voice => voice.lang === 'en-GB') || voices[0];
  }

  speak(text: string, options: {
    rate?: number;
    pitch?: number;
    volume?: number;
    onEnd?: () => void;
  } = {}) {
    this.stop();

    this.utterance = new SpeechSynthesisUtterance(text);
    
    this.utterance.rate = options.rate ?? 1;
    this.utterance.pitch = options.pitch ?? 1;
    this.utterance.volume = options.volume ?? 0.8;
    
    if (this.defaultVoice) {
      this.utterance.voice = this.defaultVoice;
    }

    if (options.onEnd) {
      this.utterance.onend = options.onEnd;
    }

    this.synthesis.speak(this.utterance);
  }

  stop() {
    this.synthesis.cancel();
  }

  readQuizQuestion(question: string, options: string[]) {
    const optionsText = options
      .map((option, index) => `${String.fromCharCode(65 + index)}, ${option}`)
      .join('. ');
    
    const fullText = `${question}. ${optionsText}`;
    
    this.speak(fullText, {
      rate: 0.9,
      pitch: 1,
      volume: 0.9
    });
  }

  readFeedback(isCorrect: boolean, correctAnswer: string) {
    const feedback = isCorrect 
      ? correctAnswer
      : correctAnswer;
    
    this.speak(feedback, {
      rate: 1,
      pitch: 1,
      volume: 0.9,
      onEnd: () => playSound(isCorrect ? 'correct' : 'wrong')
    });
  }
}

const speechService = typeof window !== 'undefined' ? new SpeechService() : null;

export function speakText(text: string, options?: Parameters<SpeechService['speak']>[1]) {
  if (speechService) {
    speechService.speak(text, options);
  }
}

export function readQuizQuestion(question: string, options: string[]) {
  if (speechService) {
    speechService.readQuizQuestion(question, options);
  }
}

export function readFeedback(isCorrect: boolean, correctAnswer: string) {
  if (speechService) {
    speechService.readFeedback(isCorrect, correctAnswer);
  }
}

export function stopSpeech() {
  if (speechService) {
    speechService.stop();
  }
}