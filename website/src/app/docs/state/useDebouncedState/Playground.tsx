'use client';

import { useEffect } from "react";
import { useDebouncedState } from "../../../../../../src";

export default function Playground() {
  const { value, debouncedValue, setValue } = useDebouncedState('', { delay: 500 });
  const isSearching = value !== debouncedValue && Boolean(value);

  useEffect(() => {
    if (!debouncedValue) return;
    const timer = setTimeout(() => {
      console.log(`Searching for: ${debouncedValue}`);
    }, 800);

    return () => clearTimeout(timer);
  }, [debouncedValue]);

  return (
    <div className="p-4 w-full space-y-4 border border-white/20 rounded-lg shadow-sm">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold font-sora text-white/60">Search Products</label>
        <div className="relative">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-4 py-2 border border-white/40 rounded-md focus:outline-none"
            placeholder="Type quickly..."
          />
          {isSearching && (
            <div className="absolute right-3 top-2.5 animate-spin h-5 w-5 border-2 border-purple-500 border-t-transparent rounded-full" />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
        <div className="p-3 rounded-lg border border-white/20">
          <p className="text-[10px] font-reddit-sans uppercase font-bold text-white/80">Immediate</p>
          <p className="text-sm font-medium truncate">{value || '—'}</p>
        </div>
        <div className="p-3 rounded-lg border border-white/20">
          <p className="text-[10px] uppercase font-bold font-reddit-sans text-purple-500">Debounced</p>
          <p className="text-sm font-medium text-purple-500 truncate">{debouncedValue || '—'}</p>
        </div>
      </div>

      <p className="text-xs text-white/60 text-center">
        The Debounced state only catches up 500ms after you stop typing.
      </p>
    </div>
  );
}
