import * as React from 'react';

/**
 * `useResettableState` is a React state hook with an explicit reset mechanism.
 *
 * @returns A state value, a setter, and a reset function.
 *
 * @example
 * ```tsx
 * const [count, setCount, reset] = useResettableState(0);
 * ```
 *
 * @author Sebastian Marat Urdanegui Bisalaya <https://sebastianurdanegui.com>
 *
 * @since 0.0.1
 * @version 0.0.1
 *
 */
export function useResettableState<T>(
	initialState: T | (() => T)
): readonly [T, React.Dispatch<React.SetStateAction<T>>, () => void] {
	const initialRef = React.useRef<T>(
		initialState instanceof Function ? initialState() : initialState
	);
	const [state, setState] = React.useState<T>(initialState);

	const reset = React.useCallback(() => {
		setState(
			typeof initialRef.current === 'function'
				? (initialRef.current as () => T)()
				: initialRef.current
		);
	}, []);

	return [state, setState, reset] as const;
}
