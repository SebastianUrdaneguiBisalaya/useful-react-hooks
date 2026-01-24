'use client';

import { useState, useEffect } from "react";
import { usePermissions, type PermissionState } from "../../../../../../src/usePermissions";
import { cn } from '@/lib/cn';

const PERMISSIONS_TO_TRACK: PermissionName[] = [
  'camera',
  'microphone',
  'geolocation',
  'notifications',
];

export default function Playground() {
  const { isSupported, permissions } = usePermissions(PERMISSIONS_TO_TRACK);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full border border-white/20 p-4 flex items-center justify-center">
        <span className="text-white/20 text-sm text-center">Loading permissions info…</span>
      </div>
    );
  }

  return (
    <div className="w-full p-4 rounded-lg shadow-sm border border-white/20">
      <h2 className="text-xl font-bold mb-4 font-sora text-white/60">Browser Permissions Tracker</h2>
      {
        isSupported ? (
          <>
            <div className="space-y-3">
              {PERMISSIONS_TO_TRACK.map((name) => {
                const status = permissions[name];

                return (
                  <div key={name} className="flex items-center justify-between p-3 border border-white/40 rounded-lg">
                    <span className="capitalize font-medium font-reddit-sans">{name}</span>
                    <StatusBadge status={status} />
                  </div>
                );
              })}
            </div>

            <footer className="mt-6 text-sm text-white/60 font-reddit-sans">
              Try changing permissions in your browser settings to see the UI update automatically.
            </footer>
          </>
        ) : (
          <div className="p-4 bg-red-100 font-reddit-sans text-red-700 rounded-md">
            <strong>Error:</strong> The Permissions API is not supported in this browser.
          </div>
        )
      }
    </div>
  )
}

function StatusBadge({ status }: { status?: PermissionState }) {
  const colors: Record<string, string> = {
    granted: 'bg-green-100 text-green-800',
    denied: 'bg-red-100 text-red-800',
    prompt: 'bg-yellow-100 text-yellow-800',
    loading: 'bg-gray-100 text-gray-400',
  };

  const currentStatus = status || 'loading';

  return (
    <span className={cn(
      'px-2 py-1 rounded text-xs font-reddit-sans font-bold uppercase',
      colors[currentStatus]
    )}>
      {currentStatus}
    </span>
  );
};
