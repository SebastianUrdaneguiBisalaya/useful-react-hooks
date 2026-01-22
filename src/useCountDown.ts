import * as React from 'react';

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
}

export interface CountDownControlls {
	/**
	 *  Pauses the countdown.
	 */
	pause: () => void;

	/**
	 * Resumes the countdown.
	 */
	resume: () => void;

	/**
	 * Resets the countdown.
	 * If a new end time is provided, it will be used; otherwise resets to initial endTime.
	 */
	reset: (newEndTime?: number) => void;
}

export interface CountDownReturn {
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
	 * Stable references to control functions.
	 */
	controls: CountDownControlls;
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
export function useCountDown({ endTime, options }: CountDown): CountDownReturn {
	const intervalValue = options?.interval ?? 1000;

	const initialEndTimeRef = React.useRef(endTime);
	const endTimeRef = React.useRef(endTime);
  const completedRef = React.useRef<boolean>(false);
  const remainingAtPauseRef = React.useRef<number>(0);
	const intervalIdRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  });

	const [count, setCount] = React.useState<number>(() => {
		return Math.max(endTime - Date.now(), 0);
	});

	const [isPaused, setIsPaused] = React.useState<boolean>(false);


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

		if (remaining <= 0 && !completedRef.current) {
			completedRef.current = true;
			clearTimer();
      setCount(0);
			optionsRef.current?.onComplete?.();
		}
	}, [clearTimer]);

	React.useEffect(() => {
		if (isPaused) return;
    if (endTimeRef.current <= Date.now() && !completedRef.current) {
      tick();
      return;
    }
    completedRef.current = false;
    clearTimer();
    tick();
    intervalIdRef.current = setInterval(tick, intervalValue);
    return clearTimer;
	}, [isPaused, intervalValue, tick, clearTimer]);

	const pause = React.useCallback(() => {
		if (isPaused || completedRef.current) return;
    const currentRemaining = Math.max(endTimeRef.current - Date.now(), 0);
    remainingAtPauseRef.current = currentRemaining;
    setIsPaused(true);
    clearTimer();
    setCount(currentRemaining);
	}, [isPaused, clearTimer]);

	const resume = React.useCallback(() => {
		if (!isPaused || completedRef.current) return;
    endTimeRef.current = Date.now() + remainingAtPauseRef.current;
    setIsPaused(false);
	}, [isPaused]);

	const reset = React.useCallback((newEndTime?: number) => {
		clearTimer();
		completedRef.current = false;
		const nextEndTime = newEndTime ?? initialEndTimeRef.current;
		endTimeRef.current = nextEndTime;
		const newRemaining = Math.max(nextEndTime - Date.now(), 0);
    remainingAtPauseRef.current = newRemaining;
    setCount(newRemaining);
    setIsPaused(false);
	}, [clearTimer]);

  const controls = React.useMemo<CountDownControlls>(() => ({
    pause,
    resume,
    reset,
  }), [pause, resume, reset]);

	return {
		count,
		isPaused,
		controls
	};
}
