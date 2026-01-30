'use client';

import { useIdle } from "../../../../../../src";
import LayoutDemo from "@/layouts/LayoutDemo";
import { cn } from "@/lib/cn";

export default function Demo() {
  const { isIdle, lastActiveAt } = useIdle({
    events: ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll'],
    timeout: 5000,
  });

  return (
    <LayoutDemo
      title="Idle"
    >
      <div className="flex items-center space-x-2">
        <span className='relative flex h-3 w-3'>
          {!isIdle && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          )}
          <span
            className={cn(
              'relative inline-flex rounded-full h-3 w-3',
              isIdle ? 'bg-amber-500' : 'bg-green-500'
            )}
          >
          </span>
        </span>
        <span className="text-sm font-reddit-sans text-white/80 font-medium">
          Status: {isIdle ? 'User is Idle' : 'User is Active'}
        </span>
      </div>

      <p className="text-sm font-reddit-sans text-white/70">
        Last Activity: {new Date(lastActiveAt).toLocaleTimeString()}
      </p>

      {isIdle && (
        <p className="text-sm text-amber-500 font-reddit-sans">
          <strong>Note:</strong> Auto-pausing background processes to save resources.
        </p>
      )}
    </LayoutDemo>
  )
}
