'use client';

import { useState, useEffect, useRef } from "react";
import { useBarcode } from "../../../../../../src";
import LayoutDemo from "@/layouts/LayoutDemo";
import LayoutNotMounted from "@/layouts/LayoutNotMounted";
import LayoutNotSupported from "@/layouts/LayoutNotSupported";

export default function Demo() {
  const [mounted, setMounted] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const seenRef = useRef<Set<string>>(new Set());
  const [codes, setCodes] = useState<DetectorBarcode[]>([]);

  const { current, start, stop, supported } = useBarcode({
    elementRef: videoRef,
    formats: ['qr_code', 'ean_13', 'code_128'],
    onDetect: (barcode) => {
      const key = `${barcode.format}-${barcode.rawValue}`;
      if (seenRef.current.has(key)) return;
      seenRef.current.add(key);
      setCodes(codes => [...codes, barcode]);
    }
  });

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 100);
  }, []);

  if (!mounted) return <LayoutNotMounted />;
  if (!supported) return <LayoutNotSupported title="Barcode" />;

  return (
    <LayoutDemo
      title="Barcode"
    >
      <div className="relative overflow-hidden rounded-md bg-black aspect-video">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          playsInline
        />
      </div>

      <div className="w-full flex flex-row items-center gap-4">
        <button
          className="px-4 py-3 text-sm rounded-md w-full flex flex-col items-center font-reddit-sans bg-purple-500 hover:bg-purple-600 transition-colors duration-500 ease-in-out cursor-pointer text-white/70"
          onClick={start}
        >
          Start scan
        </button>
        <button
          className="px-4 py-3 text-sm rounded-md w-full flex flex-col items-center font-reddit-sans bg-red-500 hover:bg-red-600 transition-colors duration-500 ease-in-out cursor-pointer text-white/70"
          onClick={() => stop()}
        >
          Stop scan
        </button>
      </div>

      {current && (
        <div
          className="flex flex-row gap-2 items-center justify-center w-full"
        >
          <span className="font-reddit-sans text-white/60">Detected code:</span>
          <span className="font-reddit-sans text-white/90 font-medium">{current.rawValue}</span>
        </div>
      )}

      {codes.length > 0 && (
        <div
          className="w-full flex flex-col items-center gap-2"
        >
          <h4 className="text-md text-white/70 font-sora">Detected codes:</h4>
          <p>
            {codes.map(word => `"${word}"`).join(', ')}
          </p>
        </div>
      )}

      <div className="text-center">
        <p className="text-xs font-reddit-sans text-white/40">
          Point your camera at a QR code or barcode to see the result.
        </p>
      </div>
    </LayoutDemo>
  )
}
