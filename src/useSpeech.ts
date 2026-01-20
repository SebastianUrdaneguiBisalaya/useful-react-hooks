import * as React from 'react';

/* eslint-disable @typescript-eslint/no-empty-interface */

interface SpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;

  start(): void;
  stop(): void;
  abort(): void;

  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => unknown) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => unknown) | null;
  onend: ((this: SpeechRecognition, ev: Event) => unknown) | null;
}

interface SpeechRecognitionEvent extends Event {
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message?: string;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

type SpeechStatus = 'idle' | 'listening' | 'stopped' | 'unsupported' | 'error';

export interface UseSpeechOptions {
  lang?: string;
  interimResults?: boolean;
  continuous?: boolean;
}

export interface UseSpeechResult {
  status: SpeechStatus;
  error: Error | null;
  transcript: string;
  start: () => void;
  stop: () => void;
}

/**
 * `useSpeech` is a React hook that provides unopinionated access to the Speech API.
 *
 * @returns
 *
 * @example
 * ```tsx
 * const speech = useSpeech({ lang: 'en-US' });
 * speech.start();
 * ```
 *
 * @author Sebastian Marat Urdanegui Bisalaya <https://sebastianurdanegui.com>
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
 * @since 0.0.1
 * @version 0.0.1
 *
 */
export function useSpeech(options: UseSpeechOptions): UseSpeechResult {
  const isClient = typeof window !== 'undefined';

  const recognitionRef = React.useRef<SpeechRecognition | null>(null);
  const mountedRef = React.useRef<boolean>(false);

  const [status, setStatus] = React.useState<SpeechStatus>('idle');
  const [error, setError] = React.useState<Error | null>(null);

  const transcriptRef = React.useRef<string>('');
  const [, forceRender] = React.useReducer(c => c + 1, 0);

  const start = React.useCallback(() => {
    if (!isClient) return;

    const SpeechRecognitionCtor = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) {
      setStatus('unsupported');
      return;
    }

    if (recognitionRef.current) return;

    const recognition = new SpeechRecognitionCtor();
    recognition.lang = options.lang ?? 'en-US';
    recognition.continuous = options.continuous ?? false
    recognition.interimResults = options.interimResults ?? false

    recognition.onresult = (event) => {
      transcriptRef.current = Array.from(event.results).map((result) => result[0]?.transcript).join('');
      forceRender();
    }

    recognition.onerror = (event) => {
      if (!mountedRef.current) return;
      setError(new Error(event.error));
      setStatus('error');
    }

    recognition.onend = () => {
      if (!mountedRef.current) return;
      recognitionRef.current = null;
      setStatus('stopped');
    }

    recognition.start();
    recognitionRef.current = recognition;
    setStatus('listening');
  }, [isClient, options.lang, options.continuous, options.interimResults]);

  const stop = React.useCallback(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      recognitionRef.current?.stop();
    }
  }, []);

  return {
    status,
    error,
    transcript: transcriptRef.current,
    start,
    stop,
  }
}
