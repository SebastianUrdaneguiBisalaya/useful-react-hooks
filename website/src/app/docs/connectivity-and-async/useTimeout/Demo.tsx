'use client';

import { useState } from "react";

import { useTimeout } from "../../../../../../src";
import LayoutDemo from "@/layouts/Layout";

export default function Demo() {
  const [isVisible, setIsVisible] = useState(false);

  const { cancel, isActive, reset, start } = useTimeout(
    () => {
      setIsVisible(false);
    },
    { delay: 3000, startOnMount: false }
  );

  const triggerNotification = () => {
    setIsVisible(true);
    start();
  };

  return (
    <LayoutDemo
      title="Timeout"
    >
      <div className="h-16 flex items-center justify-center">
        {isVisible ? (
          <div className="animate-in fade-in zoom-in duration-300 px-4 py-3 font-reddit-sans bg-green-100 text-green-700 rounded-md font-bold border border-green-200">
            Success! Task saved.
          </div>
        ) : (
          <p className="text-white/70 font-reddit-sans text-sm">No active notifications</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3">
        <button
          className="w-full text-sm cursor-pointer font-reddit-sans px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-md font-bold transition disabled:bg-purple-300"
          disabled={isActive}
          onClick={triggerNotification}
        >
          {isActive ? 'Processing...' : 'Save Changes'}
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            className="px-4 py-3 cursor-pointer font-reddit-sans bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md text-sm font-semibold transition"
            onClick={cancel}
          >
            Cancel Timer
          </button>
          <button
            className="px-4 py-3 cursor-pointer font-reddit-sans bg-white border border-gray-200 text-gray-600 rounded-md text-sm font-semibold hover:bg-gray-50 transition"
            onClick={reset}
          >
            Reset
          </button>
        </div>
      </div>

      {isActive && (
        <div>
          <p className="text-[10px] font-reddit-sans text-white/60 uppercase tracking-tighter mb-1">Auto-hiding in 3s</p>
          <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
            <div className="bg-purple-500 h-full animate-shrink-width" style={{ width: '100%' }} />
          </div>
        </div>
      )}
    </LayoutDemo>
  )
}
