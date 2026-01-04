import * as React from 'react';

import { useIntersectionObserver } from './useIntersectionObserver';

export interface SmartVideoOptions {
	/**
	 * Percentage of visibility required to start playing.
	 * (0.0 - 1.0)
	 * Default: 0.5
	 */
	threshold?: number;

	/**
	 * Reset video to time 0 when it leaves the viewport.
	 */
	resetOnExit?: boolean;

	/**
	 * Pause video when it leaves the viewport.
	 */
	pauseOnExit?: boolean;

	/**
	 * Auto-play when video becomes visible.
	 */
	autoPlay?: boolean;
}

export interface SmartVideoReturn {
	videoRef: React.RefObject<HTMLVideoElement | null>;
	isPlaying: boolean;
	isVisible: boolean;
	play: () => Promise<void>;
	pause: () => void;
	stop: () => void;
	reset: () => void;
}

export function useSmartVideo(
	options: SmartVideoOptions = {}
): SmartVideoReturn {
	const { threshold, resetOnExit, pauseOnExit, autoPlay } = options;

	const videoRef = React.useRef<HTMLVideoElement | null>(null);

	const { isVisible } = useIntersectionObserver<HTMLVideoElement>(
		{
			threshold: threshold ?? 0.5,
		},
		videoRef
	);

	const [isPlaying, setIsPlaying] = React.useState<boolean>(false);

	React.useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const canPlay = canAutoPlay(video);

		if (isVisible) {
			if (autoPlay && canPlay && video.paused) {
				video.play().catch(() => {});
			}
		} else {
			if (pauseOnExit && !video.paused) {
				video.pause();
			}

			if (resetOnExit) {
				video.currentTime = 0;
			}
		}
	}, [isVisible, autoPlay, pauseOnExit, resetOnExit]);

	React.useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const onPlay = () => setIsPlaying(true);
		const onPause = () => setIsPlaying(false);

		video.addEventListener('play', onPlay);
		video.addEventListener('pause', onPause);

		return () => {
			video.removeEventListener('play', onPlay);
			video.removeEventListener('pause', onPause);
		};
	}, []);

	const play = React.useCallback(async () => {
		if (!videoRef.current) return;
		await safePlay(videoRef.current);
	}, []);

	const pause = React.useCallback(() => {
		videoRef.current?.pause();
	}, []);

	const stop = React.useCallback(() => {
		const video = videoRef.current;
		if (!video) return;
		video.pause();
		video.currentTime = 0;
	}, []);

	const reset = React.useCallback(() => {
		if (videoRef.current) {
			videoRef.current.currentTime = 0;
		}
	}, []);

	return {
		videoRef,
		isPlaying,
		isVisible,
		play,
		pause,
		stop,
		reset,
	};
}

async function safePlay(video: HTMLVideoElement): Promise<boolean> {
	try {
		await video.play();
		return true;
	} catch (error: unknown) {
		return false;
	}
}

function canAutoPlay(video: HTMLVideoElement): boolean {
	return video.muted && video.playsInline;
}
