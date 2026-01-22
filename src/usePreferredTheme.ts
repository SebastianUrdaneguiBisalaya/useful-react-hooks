import * as React from 'react';

export type Theme = string;
export type Listener = () => void;

const listeners = new Set<Listener>();

function emit() {
	listeners.forEach(listener => listener());
}

let media: MediaQueryList | null = null;
let mediaListenerAttached = false;

export const systemThemeStore = {
	getServerSnapshot(): Theme {
		return 'light';
	},
	getSnapshot(): Theme {
		if (typeof window === 'undefined') return 'light';
		return window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light';
	},
	suscribe(listener: Listener) {
		listeners.add(listener);

		if (typeof window !== 'undefined') {
			if (!media) {
				media = window.matchMedia('(prefers-color-scheme: dark)');
			}
			if (!mediaListenerAttached) {
				media.addEventListener('change', emit);
				mediaListenerAttached = true;
			}
			return () => {
				listeners.delete(listener);
				if (listeners.size === 0 && media && mediaListenerAttached) {
					media.removeEventListener('change', emit);
					mediaListenerAttached = false;
				}
			};
		}
		return () => listeners.delete(listener);
	},
};
const storageKey = 'preferred-theme';

export const userThemeStore = {
	getSeverSnapshot(): Theme | null {
		return null;
	},
	getSnapshot(): Theme | null {
		if (typeof window === 'undefined') return null;
		return localStorage.getItem(storageKey) ?? null;
	},
	setTheme(theme: Theme | null) {
		if (typeof window === 'undefined') return;
		if (theme === null) {
			localStorage.removeItem(storageKey);
		} else {
			localStorage.setItem(storageKey, theme);
		}
		emit();
	},
	suscribe(listener: Listener) {
		listeners.add(listener);

		if (typeof window !== 'undefined') {
			const onStorage = (event: StorageEvent) => {
				if (event.key === storageKey) emit();
			};
			window.addEventListener('storage', onStorage);
			return () => {
				listeners.delete(listener);
				window.removeEventListener('storage', onStorage);
			};
		}
		return () => listeners.delete(listener);
	},
};

export interface PreferredThemeReturn {
	/**
	 * Sets a user-selected theme.
	 */
	setUserTheme: (theme: Theme | null) => void;

	/**
	 * System / OS preferred theme.
	 */
	systemTheme: Theme;

	/**
	 * Theme effectively used by the application.
	 */
	theme: Theme;

	/**
	 * Toggles between two themes.
	 * Defaults to 'light' and 'dark'.
	 */
	toggleTheme: (options?: { dark?: Theme; light?: Theme }) => void;

	/**
	 * User-selected theme, if any.
	 */
	userTheme: Theme | null;
}

/**
 * `usePreferredTheme` resolves the effective theme for the application.
 * Resolution strategy:
 * 1. User-selected theme (if present)
 * 2. System theme (prefers-color-scheme)
 * 3. Fallback ('light')
 *
 * @returns {PreferredThemeReturn}
 *
 * @example
 * ```tsx
 * function ThemeSwitcher() {
 *    const {
 *        theme,
 *        systemTheme,
 *        userTheme,
 *        toggleTheme,
 *        setUserTheme
 *    } = usePreferredTheme();
 *
 *    return (
 *        <div>
 *            <p>Resolved: {theme}</p>
 *            <p>System: {systemTheme}</p>
 *            <p>User: {userTheme ?? 'system default'}</p>
 *
 *            <button onClick={() => toggleTheme()}>
 *                Toggle
 *            </button>
 *
 *            <button onClick={() => setUserTheme('dark')}>
 *                Force Dark
 *            </button>
 *
 *            <button onClick={() => setUserTheme(null)}>
 *                Reset to System
 *            </button>
 *        </div>
 *    );
 *}
 * ```
 *
 * @author Sebastian Marat Urdanegui Bisalaya <https://sebastianurdanegui.com>
 *
 * @since 0.0.1
 * @version 0.0.1
 *
 */
export function usePreferredTheme(): PreferredThemeReturn {
	const systemTheme = React.useSyncExternalStore(
		systemThemeStore.suscribe,
		systemThemeStore.getSnapshot,
		systemThemeStore.getServerSnapshot
	);

	const userTheme = React.useSyncExternalStore(
		userThemeStore.suscribe,
		userThemeStore.getSnapshot,
		userThemeStore.getSeverSnapshot
	);

	const resolved = userTheme ?? systemTheme ?? 'light';

	const toggleTheme = React.useCallback(
		(options?: { dark?: Theme; light?: Theme }) => {
			const light = options?.light ?? 'light';
			const dark = options?.dark ?? 'dark';

			const next = resolved === 'dark' ? light : dark;
			userThemeStore.setTheme(next);
		},
		[resolved]
	);

	return {
		setUserTheme: userThemeStore.setTheme,
		systemTheme,
		theme: resolved,
		toggleTheme,
		userTheme: userTheme ?? null,
	};
}
