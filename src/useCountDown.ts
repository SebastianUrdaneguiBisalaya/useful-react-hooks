import * as React from 'react';

export type CountDownStatus = 'start' | 'running' | 'paused' | 'completed';

export interface CountDownOptions {
	/**
	 * The interval en milliseconds between each tick.
	 */
	interval?: number;

	/**
	 * A callback to be called when the countdown ends.
	 */
	onComplete?: () => void;

	/**
	 * A callback to be called on each tick.
	 */
	onTick?: (time: number) => void;
}

export interface CountDown {
	/**
	 * The end time of the countdown in milliseconds.
	 */
	endTime: number;

	/**
	 *
	 */
	options?: CountDownOptions;

	/**
	 * Whether to start the countdown on mount. Default: false.
	 */
	startOnMount?: boolean;
}

export interface CountDownControlls {
	/**
	 * Increments the countdown by a given amount of time in milliseconds.
	 */
	increment: (increment?: number) => void;

	/**
	 *  Pauses the countdown.
	 */
	pause: () => void;

	/**
	 * Resets the countdown.
	 * If a new end time is provided, it will be used; otherwise resets to initial endTime.
	 */
	reset: (newEndTime?: number) => void;

	/**
	 * Resumes the countdown
	 */
	resume: () => void;

	/**
	 * Starts the countdown.
	 */
	start: () => void;
}

export interface CountDownReturn {
	/**
	 * Stable references to control functions.
	 */
	controls: CountDownControlls;

	/**
	 * Remaining time in milliseconds.
	 * Will be `0` when the countdown has completed.
	 */
	count: number;

	/**
	 * Indicates whether the countdown is currently paused.
	 */
	isPaused: boolean;

	/**
	 * Indicates the status of the countdown.
	 */
	status: CountDownStatus;
}

/**
 * `useCountDown` is a controllable countdown hook based on an absolute end timestamp.
 * It uses a reference timestamp approach to prevent time drift commonly association with simple `setInterval` forcing.
 *
 * @author Sebastian Marat Urdanegui Bisalaya <https://sebastianurdanegui.com>
 *
 * @since 0.0.1
 * @version 0.0.1
 *
 */
export function useCountDown({
	endTime,
	options,
	startOnMount = false,
}: CountDown): CountDownReturn {
	const intervalValue = options?.interval ?? 1000;

	const initialDurationRef = React.useRef(endTime - Date.now());
	const endTimeRef = React.useRef(endTime);
	const completedRef = React.useRef<boolean>(false);
	const remainingAtPauseRef = React.useRef<number>(0);
	const intervalIdRef = React.useRef<ReturnType<typeof setInterval> | null>(
		null
	);
	const optionsRef = React.useRef(options);

	React.useEffect(() => {
		optionsRef.current = options;
	});

	const [count, setCount] = React.useState<number>(() => {
		return Math.max(endTime - Date.now(), 0);
	});

	const [isPaused, setIsPaused] = React.useState<boolean>(false);

	const [status, setStatus] = React.useState<CountDownStatus>('start');

	const clearTimer = React.useCallback(() => {
		if (intervalIdRef.current !== null) {
			clearInterval(intervalIdRef.current);
			intervalIdRef.current = null;
		}
	}, []);

	const tick = React.useCallback(() => {
		const remaining = Math.max(endTimeRef.current - Date.now(), 0);
		optionsRef.current?.onTick?.(remaining);
		setCount(remaining);
		setStatus('running');

		if (remaining <= 0 && !completedRef.current) {
			completedRef.current = true;
			clearTimer();
			setCount(0);
			setStatus('completed');
			optionsRef.current?.onComplete?.();
		}
	}, [clearTimer]);

	const pause = React.useCallback(() => {
		if (status !== 'running') return;
		const currentRemaining = Math.max(endTimeRef.current - Date.now(), 0);
		remainingAtPauseRef.current = currentRemaining;
		setIsPaused(true);
		setStatus('paused');
	}, [status]);

	const resume = React.useCallback(() => {
		if (status !== 'paused') return;
		endTimeRef.current = Date.now() + remainingAtPauseRef.current;
		setIsPaused(false);
		setStatus('running');
	}, [status]);

	const reset = React.useCallback(
		(newEndTime?: number) => {
			clearTimer();
			completedRef.current = false;
			let nextEndTime: number;
			if (newEndTime !== undefined) {
				nextEndTime = newEndTime;
			} else {
				nextEndTime = Date.now() + initialDurationRef.current;
			}
			endTimeRef.current = nextEndTime;
			const newRemaining = Math.max(nextEndTime - Date.now(), 0);
			remainingAtPauseRef.current = newRemaining;
			setCount(newRemaining);
			setIsPaused(false);
			if (startOnMount) {
				setStatus('running');
			} else {
				setStatus('start');
			}
		},
		[clearTimer, startOnMount]
	);

	const increment = React.useCallback(
		(increment?: number) => {
			if (!increment || increment <= 0 || completedRef.current) return;
			endTimeRef.current += increment;
			if (status === 'paused') {
				remainingAtPauseRef.current += increment;
				setCount(remainingAtPauseRef.current);
			}
		},
		[status]
	);

	const start = React.useCallback(() => {
		if (status !== 'start') return;
		setStatus('running');
	}, [status]);

	React.useEffect(() => {
		if (status !== 'running') {
			clearTimer();
			return;
		}
		completedRef.current = false;
		tick();
		intervalIdRef.current = setInterval(tick, intervalValue);
		return clearTimer;
	}, [status, intervalValue, tick, clearTimer]);

	React.useEffect(() => {
		if (startOnMount) {
			setStatus('running');
		}
	}, []);

	const controls = React.useMemo<CountDownControlls>(
		() => ({
			increment,
			pause,
			reset,
			resume,
			start,
		}),
		[start, pause, resume, reset, increment]
	);

	return {
		controls,
		count,
		isPaused,
		status,
	};
}
