import * as React from 'react';

interface SpeechRecognition extends EventTarget {
	abort(): void;
	continuous: boolean;
	interimResults: boolean;

	lang: string;
	onend: ((this: SpeechRecognition, ev: Event) => unknown) | null;
	onerror:
		| ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => unknown)
		| null;

	onresult:
		| ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => unknown)
		| null;
	start(): void;
	stop(): void;
}

interface SpeechRecognitionEvent extends Event {
	readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
	[index: number]: SpeechRecognitionResult;
	item(index: number): SpeechRecognitionResult;
	readonly length: number;
}

interface SpeechRecognitionResult {
	[index: number]: SpeechRecognitionAlternative;
	item(index: number): SpeechRecognitionAlternative;
	readonly length: number;
}

interface SpeechRecognitionAlternative {
	readonly confidence: number;
	readonly transcript: string;
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
	continuous?: boolean;
	interimResults?: boolean;
	lang?: string;
}

export interface UseSpeechResult {
	error: Error | null;
	start: () => void;
	status: SpeechStatus;
	stop: () => void;
	transcript: string;
}

/**
 * `useSpeech` is a React hook that provides unopinionated access to the Speech API.
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

		const SpeechRecognitionCtor =
			window.SpeechRecognition ?? window.webkitSpeechRecognition;
		if (!SpeechRecognitionCtor) {
			setStatus('unsupported');
			return;
		}

		if (recognitionRef.current) return;

		const recognition = new SpeechRecognitionCtor();
		recognition.lang = options.lang ?? 'en-US';
		recognition.continuous = options.continuous ?? false;
		recognition.interimResults = options.interimResults ?? false;

		recognition.onresult = event => {
			transcriptRef.current = Array.from(event.results)
				.map(result => result[0]?.transcript)
				.join('');
			forceRender();
		};

		recognition.onerror = event => {
			if (!mountedRef.current) return;
			setError(new Error(event.error));
			setStatus('error');
		};

		recognition.onend = () => {
			if (!mountedRef.current) return;
			recognitionRef.current = null;
			setStatus('stopped');
		};

		recognition.start();
		recognitionRef.current = recognition;
		setStatus('listening');
	}, [isClient, options.lang, options.continuous, options.interimResults]);

	const stop = React.useCallback(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
			recognitionRef.current?.stop();
		};
	}, []);

	return {
		error,
		start,
		status,
		stop,
		transcript: transcriptRef.current,
	};
}
