'use client';

import { useState, useEffect } from 'react';

import { useScreenOrientation } from "../../../../../../src";

export default function Demo() {
  const { angle, isSupported, lock, type, unlock } = useScreenOrientation();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full border border-white/20 p-4 flex items-center justify-center">
        <span className="text-white/20 text-sm text-center">Loading screen orientation info…</span>
      </div>
    );
  }

  if (!isSupported) {
    return (
      <div className="p-4 bg-red-100 font-reddit-sans text-red-700 rounded-md">
        <strong>Error:</strong> The Screen Orientation API is not supported in this browser.
      </div>
    );
  }

  const handleLock = async () => {
    try {
      await lock('landscape');
    } catch (error: unknown) {
      console.error('Error locking screen orientation:', error);
    }
  }
  return (
    <div className="p-4 space-y-4 w-full border border-white/20 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-white/60 font-sora">Screen Orientation</h2>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 rounded-lg shadow-sm border border-white/40 space-y-2">
          <p className="text-xs uppercase text-gray-500 font-semibold font-reddit-sans">Current Type</p>
          <p className="text-lg font-reddit-sans text-white">{type || 'Unknown'}</p>
        </div>
        <div className="p-4 rounded-lg shadow-sm border border-white/40 space-y-2">
          <p className="text-xs uppercase text-gray-500 font-semibold font-reddit-sans">Rotation Angle</p>
          <p className="text-lg text-white font-reddit-sans">{angle}°</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          className="w-full px-4 py-3 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-colors duration-500 ease-in-out cursor-pointer font-reddit-sans"
          onClick={handleLock}
        >
          Force Landscape Lock
        </button>

        <button
          className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-500 ease-in-out cursor-pointer font-reddit-sans"
          onClick={() => unlock()}
        >
          Unlock Orientation
        </button>
      </div>

      <p className="mt-4 text-xs text-white/60 font-reddit-sans">
        * Orientation locking usually requires a user gesture or active full-screen mode depending on the browser.
      </p>
    </div>
  )
}
