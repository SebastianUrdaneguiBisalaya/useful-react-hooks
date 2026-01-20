import * as React from 'react';

type AudioStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'ended' | 'error';

export interface UseAudioOptions {
  src?: string;
  loop?: boolean;
  volume?: number;
}

export interface UseAudioResult {
  status: AudioStatus;
  error: Error | null;
  play: () => Promise<void>;
  pause: () => void;
  audio: HTMLAudioElement | null;
}

/**
 * `useAudio` is a React hook that provides unopinionated access to the HTML5 Audio API.
 *
 * @returns
 *
 * @example
 * ```tsx
 * const audio = useAudio({ src: '/sound.mp3' });
 * audio.play();
 * ```
 *
 * @author Sebastian Marat Urdanegui Bisalaya <https://sebastianurdanegui.com>
 *
 * @since 0.0.1
 * @version 0.0.1
 *
 */
export function useAudio(options: UseAudioOptions = {}): UseAudioResult {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const mountedRef = React.useRef<boolean>(false);

  const [status, setStatus] = React.useState<AudioStatus>('idle');
  const [error, setError] = React.useState<Error | null>(null);

  const play = React.useCallback(async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setStatus('playing');
    } catch (error: unknown) {
      setError(error as Error);
      setStatus('error');
    }
  }, []);

  const pause = React.useCallback(() => {
    audioRef.current?.pause();
    setStatus('paused');
  }, []);

  React.useEffect(() => {
    mountedRef.current = true;
    const audio = new Audio(options.src ?? '');
    audio.loop = options.loop ?? false;
    audio.volume = options.volume ?? 1;

    audio.onended = () => mountedRef.current && setStatus('ended');
    audio.onerror = () => {
      if (!mountedRef.current) return;
      setError(new Error('Audio error'));
      setStatus('error');
    }
    audioRef.current = audio;

    return () => {
      mountedRef.current = false;
      audio.pause();
      audioRef.current = null;
    }
  }, [options.src, options.loop, options.volume]);

  return {
    status,
    error,
    play,
    pause,
    audio: audioRef.current,
  }
}
