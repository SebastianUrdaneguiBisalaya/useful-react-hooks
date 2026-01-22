import * as React from 'react';

export interface UseWebsocketOptions<TMessage = unknown> {
	/**
	 * Should the socket auto-connect inmediately (default: true)
	 */
	autoConnect?: boolean;

	/**
	 * Max number of reconnection attempts (default: Infinity)
	 */
	maxRetries?: number;

	/**
	 * Called when the socket closes unexpectedly
	 */
	onClose?: (event: CloseEvent) => void;

	/**
	 * Called when an error occurs
	 */
	onError?: (event: Event) => void;

	/**
	 * Called when a message is received
	 */
	onMessage?: (message: TMessage) => void;

	/**
	 * Reconnection interval in milliseconds (default: 3000)
	 */
	reconnectionInterval?: number;

	/**
	 * Websocket url
	 */
	url: string;
}

export interface UseWebsocketReturn<TMessage = unknown> {
	/**
	 * Manually disconnect the Websocket
	 */
	disconnect: () => void;

	/**
	 * Show any errors
	 */
	error: string;

	/**
	 * Connection status
	 */
	isConnected: boolean;

	/**
	 * Latest received message
	 */
	message: TMessage | null;

	/**
	 * Messages
	 */
	messages: TMessage[];

	/**
	 * Manually reconnect the Websocket
	 */
	reconnect: () => void;

	/**
	 * Send a message via Websocket
	 */
	send: (data: string | ArrayBuffer | Blob | ArrayBufferView) => void;

	/**
	 * Current Websocket instance, or null if not connected
	 */
	socket: WebSocket | null;
}

/**
 * `useWebsocket` is a React hook to manage Websocket connections with auto-reconnect, error handling, and SSR safety.
 *
 * @template TMessage Type of messages received via Websocket
 * @param options Websocket configuration options
 *
 * @returns Websocket state and controls
 *
 * @example
 * ```tsx
 * const { socket, message, isConnected, send } = useWebsocket<{ text: string }>({
 *   url: 'wss://example.com/socket',
 *   onMessage: (msg) => console.log(msg),
 * });
 *
 * React.useEffect(() => {
 *   if (isConnected) send(JSON.stringify({ hello: 'world' }));
 * }, [isConnected]);
 * ```
 *
 * @author Sebastian Marat Urdanegui Bisalaya <https://sebastianurdanegui.com>
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API
 * @since 0.0.1
 * @version 0.0.1
 *
 */
export function useWebsocket<TMessage = unknown>(
	options: UseWebsocketOptions<TMessage>
): UseWebsocketReturn<TMessage> {
	const {
		autoConnect = true,
		maxRetries = Infinity,
		onClose,
		onError,
		onMessage,
		reconnectionInterval = 3000,
		url,
	} = options;

	const [socket, setSocket] = React.useState<WebSocket | null>(null);
	const [message, setMessage] = React.useState<TMessage | null>(null);
	const [messages, setMessages] = React.useState<TMessage[]>([]);
	const [isConnected, setIsConnected] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string>('');

	const retriesRef = React.useRef<number>(0);
	const reconnectTimeoutRef = React.useRef<number | null>(null);

	const connect = React.useCallback(() => {
		if (typeof window === 'undefined') return;

		const ws = new WebSocket(url);

		ws.onopen = () => {
			setIsConnected(true);
			retriesRef.current = 0;
		};

		ws.onmessage = event => {
			try {
				const data: TMessage = JSON.parse(event.data);
				setMessage(data);
				setMessages(prev => [...prev, data]);
				onMessage?.(data);
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message);
					console.error(err.message);
				} else {
					setError('Unknown error');
					console.error(err);
				}
			}
		};

		ws.onclose = event => {
			setIsConnected(false);
			onClose?.(event);
			if (retriesRef.current < maxRetries) {
				retriesRef.current += 1;
				reconnectTimeoutRef.current = setTimeout(connect, reconnectionInterval);
			}
		};

		ws.onerror = event => {
			setError('WebSocket error');
			console.error('WebSocket error:', event);
		};

		setSocket(ws);
	}, [url, onMessage, onClose, onError, reconnectionInterval, maxRetries]);

	const disconnect = React.useCallback(() => {
		if (socket) socket.close();
		if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
	}, [socket]);

	const reconnect = React.useCallback(() => {
		disconnect();
		connect();
	}, [disconnect, connect]);

	React.useEffect(() => {
		if (autoConnect) connect();
		return () => {
			disconnect();
		};
	}, [autoConnect, connect, disconnect]);

	const send = React.useCallback(
		(data: string | ArrayBuffer | Blob | ArrayBufferView) => {
			if (socket && isConnected) {
				socket.send(data);
			} else {
				setError('WebSocket is not connected. Message not sent.');
				console.warn('WebSocket is not connected. Message not sent.');
			}
		},
		[socket, isConnected]
	);

	return {
		disconnect,
		error,
		isConnected,
		message,
		messages,
		reconnect,
		send,
		socket,
	};
}
