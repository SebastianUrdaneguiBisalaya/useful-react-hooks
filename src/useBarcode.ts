import * as React from 'react';

declare global {
	interface BarcodeDetectorOptions {
		formats?: string[];
	}

	interface DetectorBarcode {
		boundingBox?: DOMRectReadOnly;
		format: string;
		rawValue: string;
	}

	class BarcodeDetector {
		constructor(options?: BarcodeDetectorOptions);
		static getSupportedFormats(): string[];
		detect(
			image: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement
		): Promise<DetectorBarcode[]>;
	}
}

export interface UseBarcodeResult {
	/**
	 * Raw value of the barcode.
	 */
	rawValue: DetectorBarcode | null;

	/**
	 * Whether the browser supports BarcodeDetector API.
	 */
	supported: boolean;
}

export interface UseBarcodeOptions {
	/**
	 * Optional element to scan: video, image or canvas.
	 */
	elementRef?: React.RefObject<
		HTMLVideoElement | HTMLImageElement | HTMLCanvasElement
	>;

	/**
	 * Optional formats to detect (default includes most common formats).
	 */
	formats?: string[];
}

/**
 * `useBarcode` is a hook to detect barcodes using the browser's BarcodeDetector API.
 * Automatically handles camera permissions, stream cleanup, and updates the last detected barcode.
 *
 * @returns An object containing the last detected barcode and whether barcode detection is supported.
 *
 * @example
 * ```tsx
 * const videoRef = useRef<HTMLVideoElement>(null);
 * const { rawValue, supported } = useBarcode({ elementRef: videoRef });
 *
 * if (!supported) return <p>Barcode detection not supported</p>;
 *
 * return (
 *   <div>
 *     <video ref={videoRef} autoPlay />
 *     {rawValue && <p>Last barcode: {rawValue.rawValue}</p>}
 *   </div>
 * );
 * ```
 *
 * @author Sebastian Marat Urdanegui Bisalaya <https://sebastianurdanegui.com>
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Barcode_Detection_API
 * @since 0.0.1
 * @version 0.0.1
 *
 */
export function useBarcode({
	elementRef,
	formats = [
		'aztec',
		'code_128',
		'code_39',
		'code_93',
		'codabar',
		'data_matrix',
		'ean_13',
		'ean_8',
		'itf',
		'pdf417',
		'qr_code',
		'upc_a',
		'upc_e',
		'unknown',
	],
}: UseBarcodeOptions = {}): UseBarcodeResult {
	const [detected, setDetected] = React.useState<DetectorBarcode | null>(null);
	const [supported, setSupported] = React.useState<boolean>(false);

	const animationRef = React.useRef<number | null>(null);
	const streamRef = React.useRef<MediaStream | null>(null);
	const detectorRef = React.useRef<BarcodeDetector | null>(null);

	React.useEffect(() => {
		if (typeof window === 'undefined' || !('BarcodeDetector' in window)) {
			setSupported(false);
			return;
		}
		setSupported(true);

		detectorRef.current = new BarcodeDetector({ formats });

		const isVideo = elementRef?.current instanceof HTMLVideoElement;

		async function startVideo() {
			const el = elementRef?.current;
			if (!el || !(el instanceof HTMLVideoElement)) return;
			try {
				streamRef.current = await navigator.mediaDevices.getUserMedia({
					video: { facingMode: 'environment' },
				});
				el.srcObject = streamRef.current;
				el?.setAttribute('playsinline', 'true');
				await el.play();
				scanFrame();
			} catch (error: unknown) {
				console.warn('useBarcode: camera access denied or unavailable.', error);
			}
		}

		async function scanFrame() {
			const el = elementRef?.current;
			if (!el || !detectorRef.current) return;

			if (el instanceof HTMLVideoElement && el.videoWidth === 0) {
				animationRef.current = requestAnimationFrame(scanFrame);
				return;
			}

			try {
				const barcodes = await detectorRef.current.detect(el);
				if (barcodes.length > 0) {
					setDetected(barcodes[0] ?? null);
				} else {
					setDetected(null);
				}
			} catch (error: unknown) {
				console.warn('useBarcode: barcode detection failed.', error);
			} finally {
				animationRef.current = requestAnimationFrame(scanFrame);
			}
		}

		if (isVideo) startVideo();
		else scanFrame();

		return () => {
			if (animationRef.current !== null) {
				cancelAnimationFrame(animationRef.current);
			}
			if (streamRef.current) {
				streamRef.current.getTracks().forEach(track => track.stop());
			}
		};
	}, [elementRef, formats]);

	return {
		rawValue: detected,
		supported,
	};
}
