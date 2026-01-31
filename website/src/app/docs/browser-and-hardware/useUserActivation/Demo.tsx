'use client';

import { useState, useEffect } from 'react';

import { useUserActivation } from '../../../../../../src';
import { cn } from '@/lib/cn';

export default function UserActivationDemo() {
  const {
    hasBeenActive,
    isActive,
    isSupported,
    refresh,
  } = useUserActivation();

  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 100);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full max-w-md self-center border border-white/20 p-4 flex items-center justify-center bg-neutral-900">
        <span className="text-white/20 text-sm text-center font-reddit-sans">Loading screen wake lock info…</span>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-white/20 bg-neutral-900 p-6 space-y-6">
        <header className="space-y-1">
          <h3 className="text-xl font-semibold font-sora text-white/60">
            User&nbsp;Activation
          </h3>
          <p className="text-sm text-white/40 font-reddit-sans">
            Monitors the user&apos;s activation status in the browser.
          </p>
        </header>

        {!isSupported && (
          <div className="rounded-lg bg-neutral-950 text-red-400 p-4 text-sm">
            The userActivation API is not supported in this browser.
          </div>
        )}

        {isSupported && (
          <>
            <div className="space-y-3 text-sm">
              <StatusRow
                label="Did the user ever interact?"
                value={hasBeenActive}
              />
              <StatusRow
                label="Current transient activation"
                value={isActive}
              />
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3">
              <button
                className="w-full flex-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors duration-500 ease-in-out px-4 py-3 text-sm cursor-pointer font-reddit-sans"
                onClick={refresh}
              >
                Status Refresh
              </button>

              <button
                className="w-full flex-1 rounded-lg px-4 py-3 text-sm font-medium transition
                  disabled:cursor-not-allowed
                  disabled:bg-neutral-800
                  disabled:text-neutral-500
                  bg-indigo-600 hover:bg-indigo-500 cursor-pointer font-reddit-sans"
                disabled={!isActive}
                onClick={() => alert('Sensitive action executed.')}
              >
                Sensitive Action
              </button>
            </div>

            {!hasBeenActive && (
              <p className="text-xs text-white/60 font-reddit-sans">
                Interact with the page (click, keyboard, touch) to activate the state.
              </p>
            )}

            {hasBeenActive && !isActive && (
              <p className="text-xs text-white/60 font-reddit-sans">
                The temporary activation is fleeting. Try clicking and performing the action immediately.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

interface StatusRowProps {
  label: string;
  value: boolean;
}

function StatusRow({ label, value }: StatusRowProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/60 font-reddit-sans">{label}</span>
      <span
        className={cn(
          'font-medium font-reddit-sans',
          value ? 'text-emerald-400' : 'text-white/60'
        )}
      >
        {value ? 'true' : 'false'}
      </span>
    </div>
  );
}
