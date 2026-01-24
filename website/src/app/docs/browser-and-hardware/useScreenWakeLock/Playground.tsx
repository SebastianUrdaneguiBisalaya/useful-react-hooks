'use client';

import { useState, useEffect } from "react";
import { useScreenWakeLock } from "../../../../../../src";
import { cn } from "@/lib/cn";

export default function Playground() {
  const { isSupported, isActive, request, release } = useScreenWakeLock();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 100);
  }, []);

  useEffect(() => {
    return () => {
      release();
    }
  }, [release]);

  if (!mounted) {
    return (
      <div className="w-full border border-white/20 p-4 flex items-center justify-center">
        <span className="text-white/20 text-sm text-center">Loading screen wake lock info…</span>
      </div>
    );
  }

  if (!isSupported) {
    return (
      <div className="p-4 bg-red-100 font-reddit-sans text-red-700 rounded-md">
        <strong>Error:</strong> The Screen Wake Lock API is not supported in this browser.
      </div>
    );
  }

  const toggleWakeLock = async () => {
    if (isActive) {
      await release();
    } else {
      await request();
    }
  }

  return (
    <div className="p-4 space-y-4 w-full border border-white/20 rounded-lg shadow-sm">
      <h3 className="text-xl text-white/60 font-bold font-sora">Screen Wake Lock</h3>
      <p className="text-white/70 leading-relaxed font-reddit-sans">
        {isActive
          ? "Your screen is now prevented from dimming or locking."
          : "Enable wake lock to keep your screen active during use."}
      </p>

      <button
        onClick={toggleWakeLock}
        className={cn(
          'w-full px-4 py-3 rounded-md cursor-pointer font-medium font-reddit-sans transition-all',
          isActive
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
        )}
      >
        {isActive ? 'Release Wake Lock' : 'Request Wake Lock'}
      </button>

      <div className="flex items-center justify-center gap-2">
        <span
          className={cn(
            'w-2 h-2 rounded-full',
            isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-300'
          )}
        />
        <span className="text-sm font-medium text-white/40 font-reddit-sans">
          Status: {isActive ? 'Active' : 'Inactive'}
        </span>
      </div>
    </div>
  )
}
