'use client';

import { useState, useEffect } from "react";
import { useVibration } from "../../../../../../src";
import { cn } from "@/lib/cn";

export default function Demo() {
  const [mounted, setMounted] = useState<boolean>(false);
  const { isSupported, vibrate, cancel } = useVibration();
  const [lastResult, setLastResult] = useState<boolean | null>(null);
  const handleVibrate = (pattern: number | number[]) => {
  const result = vibrate(pattern);
  setLastResult(result);
  };

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 100);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full max-w-md self-center border border-white/20 p-4 flex items-center justify-center bg-neutral-900">
        <span className="text-white/20 text-sm text-center font-reddit-sans">Loading Vibration API info…</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-900 p-6 space-y-6">
        <header className="space-y-1">
          <h3 className="text-lg text-white/60 font-semibold font-sora">Vibration API</h3>
        </header>

        {isSupported && (
          <>
            <div className="space-y-3">
              <button
                onClick={() => handleVibrate(200)}
                className="cursor-pointer w-full rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-colors duration-500 ease-in-out px-4 py-3 font-reddit-sans text-sm font-medium"
              >
                Vibrate 200ms
              </button>

              <button
                onClick={() => handleVibrate([100, 50, 100])}
                className="cursor-pointer w-full rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-colors duration-500 ease-in-out px-4 py-3 font-reddit-sans text-sm font-medium"
              >
                Vibrate pattern [100, 50, 100]
              </button>


              <button
                onClick={() => handleVibrate([300, 100, 300, 100, 300])}
                className="cursor-pointer w-full rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-colors duration-500 ease-in-out px-4 py-3 font-reddit-sans text-sm font-medium"
              >
                Vibrate long pattern
              </button>


              <button
                onClick={cancel}
                className="cursor-pointer w-full rounded-lg bg-neutral-800 hover:bg-neutral-900 transition-colors duration-500 ease-in-out px-4 py-3 font-reddit-sans text-sm"
              >
                Cancel vibration
              </button>
            </div>

            <div className="rounded-lg bg-neutral-800 p-3 text-sm">
              <p className="text-white/60">
                Last result:
              </p>
              <p
                className={cn(
                  'font-medium font-reddit-sans',
                  lastResult === null
                    ? 'text-neutral-500'
                    : lastResult
                    ? 'text-emerald-400'
                    : 'text-red-400'
                )}
              >
                {lastResult === null
                ? '—'
                : lastResult
                ? 'Accepted by the user agent'
                : 'Rejected by the user agent'}
              </p>
            </div>

            <p className="text-xs text-white/40 font-reddit-sans">
              Note: Vibration only occurs if triggered by an explicit user gesture (click, tap).
            </p>
          </>
        )}
      </div>
    </div>
  )
}
